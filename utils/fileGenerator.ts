import { Document, Packer, Paragraph, TextRun, Header, Footer, ImageRun, AlignmentType } from 'docx';
import { utils, writeFile } from 'xlsx';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';

interface CustomizationOptions {
    headerText?: string;
    footerText?: string;
    artwork?: string; // base64 data URL
    fontFamily?: string;
    fontSize?: number;
}

// Helper to convert data URL to ArrayBuffer for docx library
const dataURLToArrayBuffer = (dataURL: string) => {
    const base64 = dataURL.split(',')[1];
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    // FIX: The docx library's typings are ambiguous, leading to overload resolution issues for the ImageRun constructor.
    // Returning an ArrayBuffer instead of a Uint8Array helps TypeScript select the correct overload for raster images.
    return bytes.buffer;
};

// Generates and downloads a .docx file from plain text content
export const downloadDocx = async (content: string, options: CustomizationOptions = {}, fileName: string = 'document.docx') => {
    const { headerText, footerText, artwork, fontFamily, fontSize } = options;

    const fontOptions = {
        font: fontFamily || 'Calibri',
        size: fontSize ? fontSize * 2 : 24, // docx uses half-points. 12pt = 24.
    };

    const docChildren: Paragraph[] = [];
    
    // Artwork handling
    if (artwork) {
        try {
            const imageBuffer = dataURLToArrayBuffer(artwork);
            // Using a Promise to get image dimensions
            const imageDimensions = await new Promise<{width: number, height: number}>((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve({ width: img.width, height: img.height });
                img.onerror = reject;
                img.src = artwork;
            });
            
            // Scale image to fit a standard page width (e.g., max 450px)
            const aspectRatio = imageDimensions.height / imageDimensions.width;
            const scaledWidth = Math.min(imageDimensions.width, 450);
            const scaledHeight = scaledWidth * aspectRatio;

            docChildren.push(new Paragraph({
                children: [new ImageRun({
                    data: imageBuffer,
                    transformation: { width: scaledWidth, height: scaledHeight },
                })],
                alignment: AlignmentType.CENTER,
            }));
             docChildren.push(new Paragraph(" ")); // Add a space after the image
        } catch (error) {
            console.error("Failed to process artwork for DOCX:", error);
        }
    }
    
    content.split('\n').forEach(text => {
        docChildren.push(new Paragraph({ children: [new TextRun({ text, ...fontOptions })] }));
    });

    const doc = new Document({
        sections: [{
            properties: {},
            headers: headerText ? {
                default: new Header({
                    children: [new Paragraph({ children: [new TextRun({ text: headerText, ...fontOptions })] })],
                }),
            } : undefined,
            footers: footerText ? {
                default: new Footer({
                    children: [new Paragraph({ children: [new TextRun({ text: footerText, ...fontOptions })] })],
                }),
            } : undefined,
            children: docChildren,
        }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, fileName);
};


// Generates and downloads a .pdf file from plain text content
export const downloadPdf = (content: string, options: CustomizationOptions = {}, fileName: string = 'document.pdf') => {
    const { headerText, footerText, artwork, fontFamily, fontSize } = options;
    const doc = new jsPDF();
    
    const mapFontFamily = (font: string | undefined): string => {
        switch (font?.toLowerCase()) {
            case 'arial': return 'helvetica';
            case 'times new roman': return 'times';
            case 'courier new': return 'courier';
            // jsPDF doesn't have Calibri, Georgia, Verdana built-in. Fallback to helvetica.
            case 'calibri':
            case 'georgia':
            case 'verdana':
            default: 
                return 'helvetica';
        }
    };
    
    const pdfFontFamily = mapFontFamily(fontFamily);
    const pdfFontSize = fontSize || 12;

    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let cursorY = margin;

    // Render header on all pages
    const renderHeader = () => {
        if (headerText) {
            doc.setFont(pdfFontFamily).setFontSize(10).text(headerText, margin, 10);
            cursorY = Math.max(cursorY, 20);
        }
    };
    
    // Render footer on all pages
    const renderFooter = (pageNumber: number) => {
        if (footerText) {
            let text = footerText.replace('Page Number', String(pageNumber));
            doc.setFont(pdfFontFamily).setFontSize(10).text(text, margin, pageHeight - 10);
        }
    };
    
    renderHeader();

    // Artwork handling
    if (artwork) {
        try {
            const img = new Image();
            img.onload = () => {
                const aspectRatio = img.height / img.width;
                const scaledWidth = Math.min(img.width, pageWidth - margin * 2);
                const scaledHeight = scaledWidth * aspectRatio;

                if (cursorY + scaledHeight > pageHeight - margin) {
                    renderFooter(doc.getNumberOfPages());
                    doc.addPage();
                    cursorY = margin;
                    renderHeader();
                }
                
                doc.addImage(artwork, 'JPEG', margin, cursorY, scaledWidth, scaledHeight);
                cursorY += scaledHeight + 10;
            };
            img.src = artwork; // This is synchronous for data URLs
        } catch (e) {
            console.error("Error adding image to PDF", e);
        }
    }
    
    doc.setFont(pdfFontFamily).setFontSize(pdfFontSize);
    const textLines = doc.splitTextToSize(content, pageWidth - margin * 2);
    const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
    
    textLines.forEach((line: string) => {
        if (cursorY + lineHeight > pageHeight - margin - 10) { // Check for footer space
            renderFooter(doc.getNumberOfPages());
            doc.addPage();
            cursorY = margin;
            renderHeader();
            doc.setFont(pdfFontFamily).setFontSize(pdfFontSize); // Reset font for new page
        }
        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
    });

    renderFooter(doc.getNumberOfPages());
    doc.save(fileName);
};


// Generates and downloads a .xlsx file from a JSON string
export const downloadXlsx = (jsonContent: string, fileName: string = 'spreadsheet.xlsx') => {
    try {
        // Clean the JSON string in case the AI wraps it in markdown ```json ... ```
        const cleanedJson = jsonContent.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleanedJson);

        if (!Array.isArray(data)) {
            throw new Error("JSON data is not an array.");
        }
        
        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        
        // The writeFile function from 'xlsx' handles the download process
        writeFile(workbook, fileName);

    } catch (error) {
        console.error("Failed to parse JSON or create XLSX file:", error);
        // Re-throw the error to be caught in the component for UI feedback
        if (error instanceof Error) {
            throw new Error(`Failed to process data for Excel. The AI may have returned an invalid format. Details: ${error.message}`);
        }
        throw new Error("An unknown error occurred while creating the Excel file.");
    }
};