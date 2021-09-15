import jsPDF from "jspdf";
import "jspdf-autotable";
import { AxiosMasterGet } from "../../../../axios";
import { formatDateISO } from "../../../../components/notification/function";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakKartuStock = (
  row1isi = "",
  row2isi = "",
  username = "",
  tanggal = "",
  validby = "",
  data
) => {
  // initialize jsPDF
  const doc = new jsPDF();
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  let barangloop;
  let tableRows = [];
  let footRows = [];
  let finalY = 40;
  let sub_qty = 0;
  let tableColumn = [];
  let item = [];
  doc.setFontSize(15);
  doc.text("LAPORAN KARTU STOCK", 14, 15);
  doc.setFontSize(10);
  //row 1
  doc.text(`Tanggal : ${row1isi} s/d ${row2isi}`, 14, 25);
  //   row 2
  // doc.text(`Tanggal	: ${row2isi}`, 120, 25);
  if (
    data.length === 0 &&
    localStorage.getItem("kode_spl") !== "ALL" &&
    localStorage.getItem("kode_barcode") !== "ALL"
  ) {
    AxiosMasterGet("/barang/get/info/all")
      .then((res) => (item = res.data))
      .then(() => localStorage.setItem("listbarang", JSON.stringify(item)));
    let barangloop = JSON.parse(localStorage.getItem("listbarang"));
    let hasil = barangloop.find(
      (fill) =>
        fill.supplier === localStorage.getItem("kode_spl") &&
        fill.kode_barcode === localStorage.getItem("kode_barcode")
    );
    console.log(hasil);
    if (hasil === undefined) {
      tableColumn = [
        [
          {
            content: `NAMA BARANG : ${localStorage.getItem("nama_barang")}`,
            colSpan: 3,
          },
          {
            content: `LOKASI : GUDANG`,
            colSpan: 3,
          },
        ],
        [
          {
            content: `KODE SUPPLIER : ${localStorage.getItem("kode_spl")}`,
            colSpan: 3,
          },
          {
            content: `SALDO AWAL : 0`,
            colSpan: 3,
          },
        ],
        [
          {
            content: `TANGGAL`,
          },
          {
            content: `NO BON`,
          },
          {
            content: `KETERANGAN`,
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
        ],
      ];
      tableRows = [];
      let footer = ["", "", "", "", "Sub Total", `${sub_qty}`];
      footRows.push(footer);
      doc.autoTable({
        head: tableColumn,
        body: tableRows,
        foot: footRows,
        startY: 35,
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
      finalY = doc.autoTableEndPosY() + 10;
      tableRows = [];
      footRows = [];
      sub_qty = 0;
    } else {
      tableColumn = [
        [
          {
            content: `NAMA BARANG : ${hasil.nama_barang}`,
            colSpan: 3,
          },
          {
            content: `LOKASI : GUDANG`,
            colSpan: 3,
          },
        ],
        [
          {
            content: `KODE SUPPLIER : ${hasil.supplier}`,
            colSpan: 3,
          },
          {
            content: `SALDO AWAL : ${hasil.stock}`,
            colSpan: 3,
          },
        ],
        [
          {
            content: `TANGGAL`,
          },
          {
            content: `NO BON`,
          },
          {
            content: `KETERANGAN`,
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
        ],
      ];
      tableRows = [];
      let footer = ["", "", "", "", "Sub Total", `${sub_qty}`];
      footRows.push(footer);
      doc.autoTable({
        head: tableColumn,
        body: tableRows,
        foot: footRows,
        startY: 35,
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
      finalY = doc.autoTableEndPosY() + 10;
      tableRows = [];
      footRows = [];
      sub_qty = 0;
    }
  } else if (
    data.length === 0 &&
    localStorage.getItem("kode_spl") === "ALL" &&
    localStorage.getItem("kode_barcode") === "ALL"
  ) {
    AxiosMasterGet("/barang/get/info/all")
      .then((res) => (item = res.data))
      .then(() => localStorage.setItem("listbarang", JSON.stringify(item)))
    barangloop = JSON.parse(localStorage.getItem("listbarang"));
    barangloop.forEach((barang, index) => {
      console.log(barang);
      tableColumn = [
        [
          {
            content: `NAMA BARANG : ${barang.nama_barang}`,
            colSpan: 3,
          },
          {
            content: `LOKASI : GUDANG`,
            colSpan: 3,
          },
        ],
        [
          {
            content: `KODE SUPPLIER : ${barang.supplier}`,
            colSpan: 3,
          },
          {
            content: `SALDO AWAL : ${barang.stock}`,
            colSpan: 3,
          },
        ],
        [
          {
            content: `TANGGAL`,
          },
          {
            content: `NO BON`,
          },
          {
            content: `KETERANGAN`,
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
        ],
      ];
      tableRows = [];
      let footer = ["", "", "", "", "Sub Total", `${sub_qty}`];
      footRows.push(footer);
      doc.autoTable({
        head: tableColumn,
        body: tableRows,
        foot: footRows,
        startY: index === 0 ? 35 : finalY + 5,
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
      finalY = doc.autoTableEndPosY() + 10;
      tableRows = [];
      footRows = [];
      sub_qty = 0;
    });
  } else {
    if (localStorage.getItem("kode_spl") === "ALL") {
      data.forEach((barang, index) => {
        tableColumn = [
          [
            {
              content: `NAMA BARANG : ${barang.nama_barang}`,
              colSpan: 3,
            },
            {
              content: `LOKASI : GUDANG`,
              colSpan: 3,
            },
          ],
          [
            {
              content: `KODE SUPPLIER : ${barang._id.kode_supplier}`,
              colSpan: 3,
            },
            {
              content: `SALDO AWAL : ${barang.detail[0].awal_qty}`,
              colSpan: 3,
            },
          ],
          [
            {
              content: `TANGGAL`,
            },
            {
              content: `NO BON`,
            },
            {
              content: `KETERANGAN`,
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
          ],
        ];
        barang.detail.forEach((data) => {
          let rows = [
            formatDateISO(data.tanggal),
            data.no_ref,
            data.keterangan,
            data.masuk_qty || "0",
            data.keluar_qty || "0",
            data.akhir_qty,
          ];
          sub_qty = sub_qty + parseInt(data.akhir_qty);
          tableRows.push(rows);
        });
        let footer = ["", "", "", "", "Sub Total", `${sub_qty}`];
        footRows.push(footer);
        doc.autoTable({
          head: tableColumn,
          body: tableRows,
          foot: footRows,
          startY: index === 0 ? 35 : finalY + 5,
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
        finalY = doc.autoTableEndPosY() + 10;
        tableRows = [];
        footRows = [];
        sub_qty = 0;
      });
    } else if (
      localStorage.getItem("kode_barcode") === "ALL" &&
      localStorage.getItem("kode_spl") !== "ALL"
    ) {
      data.forEach((barang, index) => {
        tableColumn = [
          [
            {
              content: `NAMA BARANG : ${barang.nama_barang}`,
              colSpan: 3,
            },
            {
              content: `LOKASI : GUDANG`,
              colSpan: 3,
            },
          ],
          [
            {
              content: `KODE SUPPLIER : ${barang._id.kode_supplier}`,
              colSpan: 3,
            },
            {
              content: `SALDO AWAL : ${barang.saldo_awal}`,
              colSpan: 3,
            },
          ],
          [
            {
              content: `TANGGAL`,
            },
            {
              content: `NO BON`,
            },
            {
              content: `KETERANGAN`,
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
          ],
        ];
        barang.detail.forEach((data) => {
          let rows = [
            formatDateISO(data.tanggal),
            data.no_ref,
            data.keterangan,
            data.masuk_qty || "0",
            data.keluar_qty || "0",
            data.akhir_qty,
          ];
          sub_qty = sub_qty + parseInt(data.akhir_qty);
          tableRows.push(rows);
        });
        let footer = ["", "", "", "", "Sub Total", `${sub_qty}`];
        footRows.push(footer);
        doc.autoTable({
          head: tableColumn,
          body: tableRows,
          foot: footRows,
          startY: index === 0 ? 35 : finalY + 5,
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
        finalY = doc.autoTableEndPosY() + 10;
        tableRows = [];
        footRows = [];
        sub_qty = 0;
      });
    } else {
      data.forEach((barang, index) => {
        tableColumn = [
          [
            {
              content: `NAMA BARANG : ${barang.nama_barang}`,
              colSpan: 3,
            },
            {
              content: `LOKASI : GUDANG`,
              colSpan: 3,
            },
          ],
          [
            {
              content: `KODE SUPPLIER : ${barang._id.kode_supplier}`,
              colSpan: 3,
            },
            {
              content: `SALDO AWAL : ${barang.saldo_awal}`,
              colSpan: 3,
            },
          ],
          [
            {
              content: `TANGGAL`,
            },
            {
              content: `NO BON`,
            },
            {
              content: `KETERANGAN`,
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
          ],
        ];
        barang.detail.forEach((data) => {
          let rows = [
            formatDateISO(data.tanggal),
            data.no_ref,
            data.keterangan,
            data.masuk_qty || "0",
            data.keluar_qty || "0",
            data.akhir_qty,
          ];
          sub_qty = sub_qty + parseInt(data.akhir_qty);
          tableRows.push(rows);
          let footer = ["", "", "", "", "Sub Total", `${sub_qty}`];
          footRows.push(footer);
        });
      });
      doc.autoTable({
        head: tableColumn,
        body: tableRows,
        foot: footRows,
        startY: 35,
        theme: "plain",
        margin: { top: 20 },
        bodyStyles: { lineWidth: 0.02, lineColor: "#000" },
        headStyles: {
          lineWidth: 0.02,
          lineColor: "#000",
          fillColor: [212, 212, 211],
        },
      });

      finalY = doc.autoTableEndPosY() + 10;
    }
  }
  // const date = Date().split(" ");
  // we use a date string to generate our filename.
  // const dateStr = date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left

  doc.text(`User	: ${username}`, 14, finalY);
  doc.text(`Cetak	: ${tanggal}`, 14, finalY + 5);
  doc.text(`Valid	: ${validby}`, 14, finalY + 10);
  const pages = doc.internal.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.width; //Optional
  const pageHeight = doc.internal.pageSize.height; //Optional
  doc.setFontSize(10); //Optional
  for (let j = 1; j < pages + 1; j++) {
    let horizontalPos = pageWidth / 2; //Can be fixed number
    let verticalPos = pageHeight - 10; //Can be fixed number
    doc.setPage(j);
    doc.text(`${j} of ${pages}`, horizontalPos, verticalPos, {
      align: "center",
    });
  }
  doc.autoPrint();
  doc.setProperties({
    title: "LAPORAN KARTU STOCK",
  });
  var string = doc.output("datauristring");
  var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
  var x = window.open();
  x.document.open();
  x.document.write(embed);
  // setInterval(() => {
  //   x.close();
  // }, 1000);
};

export default CetakKartuStock;
