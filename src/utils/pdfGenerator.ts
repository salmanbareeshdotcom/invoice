import jsPDF from 'jspdf';

export interface InvoiceData {
  invoiceDate: string;
  dueDate: string;
  billToName: string;
  billToAddress: string;
  billFromName: string;
  billFromAddress: string;
  lineItemName: string;
  lineItemDescription: string;
  lineItemRate: number;
  lineItemAmount: number;
  totalAmount: number;
}

export const generatePDF = (data: InvoiceData[]): jsPDF => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', pageWidth / 2, 20, { align: 'center' });

  let currentY = 40;

  data.forEach((invoice, index) => {
    if (index > 0) {
      doc.addPage();
      currentY = 20;
    }

    // Invoice details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice Date: ${invoice.invoiceDate}`, 15, currentY);
    doc.text(`Due Date: ${invoice.dueDate}`, 15, currentY + 5);
    currentY += 15;

    // Billing details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill From:', 15, currentY);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.billFromName || '', 15, currentY + 7);
    doc.text(invoice.billFromAddress || '', 15, currentY + 14);
    currentY += 30;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 15, currentY);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.billToName || '', 15, currentY + 7);
    doc.text(invoice.billToAddress || '', 15, currentY + 14);
    currentY += 30;

    // Table header
    doc.setFillColor(240, 240, 240);
    doc.rect(15, currentY, pageWidth - 30, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Description', 20, currentY + 7);
    doc.text('Rate', 130, currentY + 7);
    doc.text('Amount', 170, currentY + 7);
    currentY += 15;

    // Table content
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.lineItemName, 20, currentY);
    doc.text(invoice.lineItemDescription || '', 50, currentY);
    doc.text(`₹${invoice.lineItemRate.toFixed(2)}`, 130, currentY);
    doc.text(`₹${invoice.lineItemAmount.toFixed(2)}`, 170, currentY);
    currentY += 10;

    // Total amount
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: ₹${invoice.totalAmount.toFixed(2)}`, pageWidth - 50, currentY + 20, { align: 'left' });

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Thank you for your business!', pageWidth / 2, 280, { align: 'center' });
  });

  return doc;
};

// Example usage
const invoiceData: InvoiceData[] = [
  {
    invoiceDate: '10-01-2025',
    dueDate: '20-01-2025',
    billToName: 'John Doe',
    billToAddress: '123 Elm St, Springfield, IL',
    billFromName: 'ABC Supplies Inc.',
    billFromAddress: '456 Oak St, Metropolis, NY',
    lineItemName: 'Office Chair',
    lineItemDescription: 'Ergonomic chair with lumbar support',
    lineItemRate: 200,
    lineItemAmount: 200,
    totalAmount: 200,
  },
  {
    invoiceDate: '11-01-2025',
    dueDate: '21-01-2025',
    billToName: 'Jane Smith',
    billToAddress: '789 Pine St, Hartford, CT',
    billFromName: 'XYZ Tools Co.',
    billFromAddress: '321 Maple St, Gotham City, NJ',
    lineItemName: 'Tool Set',
    lineItemDescription: 'Professional-grade toolset',
    lineItemRate: 150,
    lineItemAmount: 150,
    totalAmount: 150,
  },
  {
    invoiceDate: '12-01-2025',
    dueDate: '22-01-2025',
    billToName: 'Michael Brown',
    billToAddress: '456 Birch St, Denver, CO',
    billFromName: 'LMN Services',
    billFromAddress: '987 Walnut St, Central City, CA',
    lineItemName: 'Website Design',
    lineItemDescription: 'Custom responsive website design',
    lineItemRate: 1000,
    lineItemAmount: 1000,
    totalAmount: 1000,
  },
];

generatePDF(invoiceData).save('invoices.pdf');
