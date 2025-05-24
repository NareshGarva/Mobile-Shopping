const PDFDocument = require('pdfkit');

function generateInvoice(doc, order) {
  const margin = 50;
  const pageWidth = doc.page.width - margin * 2;

  // Header
  doc.fontSize(20).font('Helvetica-Bold').fillColor('#2563eb')
     .text('Mobile Shopping', margin, margin);
  doc.fontSize(10).font('Helvetica').fillColor('#64748b')
     .text('Premium Mobile Store & Services', margin, doc.y + 5);
  doc.text('support@mobileshopping.com | +91-XXXXXXXXXX', margin, doc.y + 3);

  // Invoice Title
  doc.fontSize(16).font('Helvetica-Bold').fillColor('#1e293b')
     .text('INVOICE', margin + pageWidth - 100, margin, { align: 'right' });
  
  doc.fontSize(10).font('Helvetica').fillColor('#64748b');
  doc.text(`Invoice #: INV-${order.orderId || 'N/A'}`, margin + pageWidth - 100, doc.y + 5, { align: 'right' });
  doc.text(`Date: ${new Date(order.orderDate).toLocaleDateString('en-IN')}`, margin + pageWidth - 100, doc.y + 3, { align: 'right' });

  doc.y = 150;

  // Order Information
  doc.fontSize(12).font('Helvetica-Bold').fillColor('#1e293b')
     .text('ORDER INFORMATION', margin, doc.y);
  
  doc.fontSize(9).font('Helvetica').fillColor('#64748b');
  const orderY = doc.y + 15;
  doc.text(`Order ID: ${order.orderId}`, margin, orderY);
  doc.text(`Status: ${order.shippingStatus}`, margin + 120, orderY);
  doc.text(`Payment Method: ${order.paymentMethod}`, margin + 240, orderY);
  doc.text(`Order Date: ${new Date(order.orderDate).toLocaleDateString('en-IN')}`, margin, orderY + 12);
  doc.text(`Payment Status: ${order.paymentStatus}`, margin + 120, orderY + 12);

  doc.y = orderY + 40;

  // Addresses
  const billing = order.billingAddress || {};
  const shipping = order.shippingAddress || {};

  const addressBlock = (title, addr, x) => {
    doc.fontSize(12).font('Helvetica-Bold').fillColor('#1e293b')
       .text(title, x, doc.y);
    
    doc.fontSize(9).font('Helvetica').fillColor('#64748b');
    let addressY = doc.y + 15;
    doc.text(addr.fullName || 'N/A', x, addressY);
    doc.text(addr.addressLine1 || '', x, addressY + 12);
    doc.text(addr.localityArea || '', x, addressY + 24);
    doc.text(`${addr.cityTown || ''} ${addr.state || ''}`, x, addressY + 36);
    doc.text(`PIN: ${addr.pinCode || ''}`, x, addressY + 48);
    doc.text(`Mobile: ${addr.mobileNumber || ''}`, x, addressY + 60);
  };

  const yStart = doc.y;
  addressBlock('BILLING ADDRESS', billing, margin);
  doc.y = yStart;
  addressBlock('SHIPPING ADDRESS', shipping, margin + 250);

  doc.y = yStart + 90;
doc.moveDown(3);
  // Items Table
  doc.fontSize(12).font('Helvetica-Bold').fillColor('#1e293b')
     .text('ITEMS ORDERED', margin, doc.y);
  doc.moveDown(0.8);

  // Table Header
  const tableTop = doc.y;
  doc.rect(margin, tableTop, pageWidth, 25).fill('#f1f5f9').stroke('#e2e8f0');
  
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1e293b');
  doc.text('DESCRIPTION', margin + 5, tableTop + 8);
  doc.text('QTY', margin + 300, tableTop + 8, { width: 40, align: 'center' });
  doc.text('UNIT PRICE', margin + 350, tableTop + 8, { width: 70, align: 'center' });
  doc.text('AMOUNT', margin + 430, tableTop + 8, { width: 70, align: 'center' });

  let currentY = tableTop + 25;
  let totalAmount = 0;

  (order.OrderItems || []).forEach((item) => {
    const variants = item.orderItemVarients || item.orderItemVarient || [];
    const qty = item.itemQty || 1;
    const price = item.itemPrice || 0;
    const total = qty * price;
    totalAmount += total;

    const rowHeight = 35;
    doc.rect(margin, currentY, pageWidth, rowHeight).stroke('#e2e8f0');

    // Description
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#1e293b');
    doc.text(item.itemTitle || 'Item', margin + 5, currentY + 5, { width: 280 });
    
    doc.fontSize(8).font('Helvetica').fillColor('#64748b');
    let descY = currentY + 25;
    
    if (Array.isArray(variants)) {
      const variantString = variants.map(v => `${v.label}: ${v.value}`).join(' • ');
      if (variantString) {
        doc.text(variantString, margin + 5, descY, { width: 280 });
        descY += 10;
      }
    }
    
    if (item.itemColor) {
      doc.text(`Color: ${item.itemColor}`, margin + 5, descY, { width: 280 });
    }

    // Quantity, Price, Total
    doc.fontSize(10).font('Helvetica').fillColor('#1e293b');
    doc.text(qty.toString(), margin + 300, currentY + 12, { width: 40, align: 'center' });
    doc.text(`Rs. ${price.toFixed(2)}`, margin + 350, currentY + 12, { width: 70, align: 'center' });
    doc.font('Helvetica-Bold');
    doc.text(`Rs. ${total.toFixed(2)}`, margin + 430, currentY + 12, { width: 70, align: 'center' });

    currentY += rowHeight;
  });

  // Totals
  const taxRate = order.taxRate || 18;
  const taxAmount = (totalAmount * taxRate) / 100;
  const grandTotal = totalAmount + taxAmount;

  currentY += 10;
  const totalsX = margin + 300;

  doc.fontSize(10).font('Helvetica').fillColor('#64748b');
  doc.text('Subtotal:', totalsX, currentY, { width: 90, align: 'right' });
  doc.text(`Rs. ${totalAmount.toFixed(2)}`, totalsX + 100, currentY, { width: 70, align: 'right' });

  doc.text(`GST (${taxRate}%):`, totalsX, currentY + 15, { width: 90, align: 'right' });
  doc.text(`Rs. ${taxAmount.toFixed(2)}`, totalsX + 100, currentY + 15, { width: 70, align: 'right' });

  doc.font('Helvetica-Bold').fillColor('#1e293b');
  doc.text('GRAND TOTAL:', totalsX, currentY + 30, { width: 90, align: 'right' });
  doc.text(`Rs. ${grandTotal.toFixed(2)}`, totalsX + 100, currentY + 30, { width: 70, align: 'right' });

  //footer
doc.moveDown(5);
// Move cursor to the left margin first
doc.x = margin;

// Now write centered text in the available page width (pageWidth)
doc.fontSize(11).font('Helvetica-Bold').fillColor('#2563eb')
   .text('Thank you for choosing Mobile Shopping!', {
     width: pageWidth,
     align: 'left',
   });

// Similarly for other lines (you can remove margin x, just text with width)
doc.fontSize(8).font('Helvetica').fillColor('#64748b');
doc.text('Terms & Conditions:', { width: pageWidth });
doc.text('• For support: support@mobileshopping.com | +91-XXXXXXXXXX', { width: pageWidth });
doc.text('• Return policy: 15 days from delivery date', { width: pageWidth });


  // return doc;
}

module.exports = generateInvoice;