import jsPDF from "jspdf";
import "jspdf-autotable";
import Moment from "moment";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakReturnCustomer = (
  row1isi = "",
  row2isi = "",
  username = "",
  tanggal = "",
  validby = "",
  data
) => {
  // initialize jsPDF
  const doc = new jsPDF();
  let list = data;
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  // let data = [
  //   {
  //     tanggal: "5 februari 2021",
  //     customer: "OCTAVIAN",
  //     nomor_bon_return: "RT01923123",
  //     nomor_bon_jual: "JL129312u123",
  //     list_barang: [
  //       {
  //         barcode: "919238123",
  //         nama_barang: "MICRO BEARING",
  //         merk: "GENIO",
  //         qty: 5,
  //         satuan: "PCS",
  //         harga_satuan: 200000,
  //         saldo: 1000000,
  //       },
  //       {
  //         barcode: "817236123",
  //         nama_barang: "ROLLER NMAX",
  //         merk: "YAMAHA",
  //         qty: 5,
  //         satuan: "SET",
  //         harga_satuan: 200000,
  //         saldo: 1000000,
  //       },
  //     ],
  //   },
  //   {
  //     tanggal: "5 februari 2021",
  //     customer: "OCTAVIAN",
  //     nomor_bon_return: "RT01923123",
  //     nomor_bon_jual: "JL129312u123",
  //     list_barang: [
  //       {
  //         barcode: "919238123",
  //         nama_barang: "MICRO BEARING",
  //         merk: "GENIO",
  //         qty: 5,
  //         satuan: "PCS",
  //         harga_satuan: 200000,
  //         saldo: 1000000,
  //       },
  //       {
  //         barcode: "817236123",
  //         nama_barang: "ROLLER NMAX",
  //         merk: "YAMAHA",
  //         qty: 5,
  //         satuan: "SET",
  //         harga_satuan: 200000,
  //         saldo: 1000000,
  //       },
  //     ],
  //   },
  //   {
  //     tanggal: "5 februari 2021",
  //     customer: "OCTAVIAN",
  //     nomor_bon_return: "RT01923123",
  //     nomor_bon_jual: "JL129312u123",
  //     list_barang: [
  //       {
  //         barcode: "919238123",
  //         nama_barang: "MICRO BEARING",
  //         merk: "GENIO",
  //         qty: 5,
  //         satuan: "PCS",
  //         harga_satuan: 200000,
  //         saldo: 1000000,
  //       },
  //       {
  //         barcode: "817236123",
  //         nama_barang: "ROLLER NMAX",
  //         merk: "YAMAHA",
  //         qty: 5,
  //         satuan: "SET",
  //         harga_satuan: 200000,
  //         saldo: 1000000,
  //       },
  //     ],
  //   },
  // ];
  let tableRows = [];
  let finalY = 40;
  let sub_total = 0;
  let tableColumn = ["KODE BARCODE", "NAMA BARANG", "QTY"];
  list.forEach((item, index) => {
    let tgl = Moment(item.tgl_retur).format("DD/MM/YYYY");
    doc.setFontSize(10);
    //   row 2
    doc.text(
      `Pegawai : ${item.kode_pegawai}`,
      14,
      index === 0 ? 40 : finalY + 5
    );
    doc.text(
      `Tanggal Retur : ${tgl}`,
      100,
      index === 0 ? 40 : finalY + 5
    );
    // doc.text(`Customer : tes`, 14, index === 0 ? 45 : finalY + 10);
    doc.text(
      `Nomor Bon Return : ${item.no_retur}`,
      100,
      index === 0 ? 45 : finalY + 10
    );
    item.detail.forEach((barang, index) => {
      let rows = [
        barang.kode_barcode,
        barang.nama_barang,
        // barang.merk,
        barang.qty,
      ];
      sub_total = sub_total + parseFloat(barang.saldo);
      tableRows.push(rows);
      console.log(tableRows);
    });
    doc.autoTable(tableColumn, tableRows, {
      startY: index === 0 ? 50 : finalY + 15,
      theme: "plain",
      rowPageBreak: "avoid",
      pageBreak: "avoid",
      margin: { top: 20 },
      bodyStyles: { lineWidth: 0.02, lineColor: "#000" },
      headStyles: {
        lineWidth: 0.02,
        lineColor: "#000",
        fillColor: [212, 212, 211],
      },
    });
    finalY = doc.lastAutoTable.finalY + 10;
    tableRows = [];
    sub_total = 0;
  });
  // const date = Date().split(" ");
  // we use a date string to generate our filename.
  // const dateStr = date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.setFontSize(15);
  doc.text("LAPORAN RETUR CUSTOMER", 14, 15);
  doc.setFontSize(10);
  //row 1
  doc.text(`TANGGAL : ${row1isi}`, 14, 25);
  doc.text(`KATEGORI : ${row2isi}`, 14, 30);
  console.log(row1isi);
  //   row 2
  //   doc.text(`Tanggal	: ${row2isi}`, 120, 25);

  doc.text(`User	: ${username}`, 14, finalY + 10);
  doc.text(`Cetak	: ${tanggal}`, 14, finalY + 16);
  doc.text(`Valid	: ${validby}`, 14, finalY + 22);

  doc.setProperties({
    title: "LAPORAN RETUR CUSTOMER",
  });
  // doc.autoPrint();
  // doc.save(`${title}_${dateStr}.pdf`);
  var string = doc.output("datauristring");
  var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
  var x = window.open();
  x.document.open();
  x.document.write(embed);
  x.document.close();
};

export default CetakReturnCustomer;
