import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakPiutang = (
  row1name = "",
  row1isi = "",
  row2name = "",
  row2isi = "",
  row3name = "",
  row3isi = "",
  row4name = "",
  row4isi = "",
  username = "",
  tanggal = "",
  validby = "",
  tableColumn = [],
  title = "",
  tableRows,
  footerRows,
  tandatangan
) => {
  // initialize jsPDF
  const doc = new jsPDF();
  // var tickets = JSON.parse(data);
  // define the columns we want and their titles

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {
    foot: footerRows,
    startY: 40,
    theme: "plain",
    bodyStyles: { lineWidth: 0.02, lineColor: "#000" },
    headStyles: {
      lineWidth: 0.02,
      lineColor: "#000",
      fillColor: [212, 212, 211],
    },
  });
  let finalY = doc.lastAutoTable.finalY + 10;
  // const date = Date().split(" ");
  // we use a date string to generate our filename.
  // const dateStr = date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text(title, 14, 15);
  doc.setFontSize(10);
  //row 1
  doc.text(`${row1name}	: ${row1isi}`, 14, 25);
  // doc.text(":", 37, 25);
  // doc.text(row1isi, 40, 25);
  doc.text(`${row2name}	: ${row2isi}`, 120, 25);
  // doc.text(":", 141, 25);
  // doc.text(row2isi, 145, 25);
  //row 2
  // doc.text(`${row3name}	: ${row3isi}`, 14, 30);
  // doc.text(":", 37, 30);
  // doc.text(row3isi, 40, 30);
  // doc.text(`${row4name}	: ${row4isi}`, 120, 30);
  // doc.text(":", 141, 30);
  // doc.text(row4isi, 145, 30);

  if (tandatangan) {
    // Tanda Tangan
    doc.text("Mengetahui", 27, finalY + 5);
    doc.text("(.................................)", 20, finalY + 25);
    doc.text("Penerima", 140, finalY + 5);
    doc.text("(.................................)", 130, finalY + 25);
  } else {
    doc.text(`User	: ${username}`, 14, finalY + 10);
    doc.text(`Cetak	: ${tanggal}`, 14, finalY + 16);
    doc.text(`Valid	: ${validby}`, 14, finalY + 22);
  }

  // doc.autoPrint();
  // doc.save(`${title}_${dateStr}.pdf`);
  var string = doc.output("datauristring");
  var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
  var x = window.open();
  x.document.open();
  x.document.write(embed);
  x.document.close();
};

export default CetakPiutang;
