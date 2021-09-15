import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const Test = (row1isi = "", row2isi = "", row3isi = "") => {
  // initialize jsPDF
  const doc = new jsPDF("portrait");
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  let data = [
    {
      no_terima: "0.00",
      // tanggal: "BAGONG-SEMARANG",
      // no_bon: "20-02-2021",
      // supplier: "FJ2001312-0032",
      detail_barang: [
        {
          no: "13-02-2020",
          kode: "PB-200213-0001",
          bruto: 0.0,
          persen: "1,048.54",
          netto: "-1,048.54",
          pkg: "PINDAH BRG PB-200213-0001",
          gross: "WAHAB",
          // qty: 0,
          // p: 2.044,
          // k: 10,
          // ongkos: 0,
        },
        {
          no: "13-02-2020",
          kode: "PB-200213-0002",
          bruto: 0.0,
          persen: "200",
          netto: "-1,248.54",
          pkg: "PINDAH BRG PB-200213-0002",
          gross: "SUMBER BARU",
          // qty: 0,
          // p: 2.044,
          // k: 10,
          // ongkos: 0,
        },
        {
          no: "13-02-2020",
          kode: "PB-200213-0004",
          bruto: 0.0,
          persen: "300",
          netto: "-1,548.54",
          pkg: "PINDAH BRG PB-200213-0004",
          gross: "ABC",
          // qty: 0,
          // p: 2.044,
          // k: 10,
          // ongkos: 0,
        },
        // {
        //   no: 2,
        //   kode: "110PER110",
        //   bruto: 100,
        //   persen: 110,
        //   netto: 110,
        //   pkg: 100,
        //   gross: 200,
        //   qty: 1,
        //   p: 5,
        //   k: 10,
        //   ongkos: 0,
        // },
      ],
    },
  ];
  let tableRows = [];
  let footRows = [];
  let finalY = 40;
  let total = 0;
  doc.setFontSize(18);
  doc.text("LAPORAN KARTU STOCK", 14, 15);
  doc.setFontSize(8);
  //row 1
  doc.text(`TANGGAL : 01-01-2021 s/d 20-02-2021`, 14, 25);
  doc.text(`LOKASI : PUSAT`, 14, 30);
  //   row 2
  doc.text(`JENIS	: ARG`, 14, 35);
  data.forEach((item, index) => {
    let tableColumn = [
      [
        {
          content: `SALDO AWAL \t: ${item.no_terima}`,
          colSpan: 7,
        },
        // {
        //   content: `NAMA TOKO \t: ${item.tanggal}`,
        //   colSpan: 3,
        // },
      ],
      // [
      //   {
      //     content: `TANGGAL BAYAR\t: ${item.no_bon}`,
      //     colSpan: 3,
      //   },
      //   // {
      //   //   content: `NO.BON\t: ${item.supplier}`,
      //   //   colSpan: 3,
      //   // },
      // ],
      [
        {
          content: `TANGGAL`,
        },
        {
          content: `REFF`,
        },
        {
          content: `MASUK`,
        },
        {
          content: `KELUAR`,
        },
        {
          content: `SALDO`,
        },
        {
          content: `KETERANGAN 1`,
        },
        {
          content: `KETERANGAN 1`,
        },
        // {
        //   content: `SELISIH`,
        // },
        // {
        //   content: `NETT(Gr)`,
        // },
        // {
        //   content: `Gross(Gr)`,
        // },
        // {
        //   content: `Qty`,
        // },
        // {
        //   content: `P`,
        // },
        // {
        //   content: `K`,
        // },
        // {
        //   content: `Ongkos(Rp)`,
        // },
      ],
    ];
    item.detail_barang.forEach((list) => {
      let rows = [
        list.no,
        list.kode,
        list.bruto,
        list.persen,
        list.netto,
        list.pkg,
        list.gross,
        // list.qty,
        // list.p,
        // list.k,
        // list.ongkos,
      ];
      total = total + parseFloat(list.harga_total);
      tableRows.push(rows);
    });
    let foot = ["SUB TOTAL", "", "", "1,548.54", "", "", "", ""];
    footRows.push(foot);

    finalY = doc.lastAutoTable.finalY + 2;
    doc.autoTable({
      head: tableColumn,
      body: tableRows,
      foot: footRows,
      startY: index === 0 ? 40 : finalY,
      theme: "plain",
      rowPageBreak: "avoid",
      pageBreak: "avoid",
      margin: { top: 20 },
      bodyStyles: { lineWidth: 0.02, lineColor: "#000", fontSize: 8 },
      headStyles: {
        lineWidth: 0.02,
        lineColor: "#000",
        fillColor: [212, 212, 211],
        fontSize: 8,
      },
      footStyles: {
        fontSize: 8,
      },
    });
    tableRows = [];
    footRows = [];
  });

  // doc.autoPrint();
  // doc.save(`${title}_${dateStr}.pdf`);
  var string = doc.output("datauristring");
  var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
  var x = window.open();
  x.document.open();
  x.document.write(embed);
  // x.document.close();
  // setInterval(() => {
  //   x.close();
  // }, 1000);
};

export default Test;
