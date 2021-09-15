import jsPDF from "jspdf";
import "jspdf-autotable";
import angkaTerbilang from "@develoka/angka-terbilang-js";
import Moment from "moment";
import { getNextDay } from "../../../components/helpers/function";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakFakturJual = (data) => {
  // initialize jsPDF
  const doc = new jsPDF();
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  doc.setFontSize(15);
  doc.text("FAKTUR PENJUALAN", 14, 15);
  doc.setFontSize(10);

  // let data = [
  //   {
  //     _id: "6034b6285baac72d97ee5d03",
  //     km_masuk: 8000,
  //     km_keluar: 8001,
  //     km_service: 12000,
  //     status_booking: true,
  //     sub_total: 18930000,
  //     disk_part_rp: 230000,
  //     disk_jasa_rp: 200000,
  //     grand_total: 18960000,
  //     ppn: 1893000,
  //     total_bayar: 20856000,
  //     status_masuk_piutang: false,
  //     status_close: "OPEN",
  //     no_service: "SV210223-0001",
  //     tgl_system: "20210223",
  //     tgl_service: "20210223",
  //     jam_service: "15:00:40",
  //     kode_customer: "CB7C851-DBD5-B348-6B3F-D2ADE52A57F",
  //     nama_customer: "OCTAVIAN",
  //     nopol_kendaraan: "D4083AAP",
  //     tgl_masuk: "20210223",
  //     tgl_keluar: "20210224",
  //     jdw_service: "20210330",
  //     keluhan: "GANTI KAKI + KNALPOT",
  //     id_mekanik: "P001",
  //     input_by: "octa25",
  //     input_date: "2021-02-23T08:00:40.000Z",
  //     detail_barang: [
  //       {
  //         no_urut: 1,
  //         kode_supplier: "-",
  //         qty: 1,
  //         _id: "6034b6285baac72d97ee5d04",
  //         kode: "SERVICE KAKI",
  //         nama: "SERVICE ACCU",
  //         harga_satuan: 500000,
  //         harga_total: 500000,
  //         keterangan: "GANTI KAKI",
  //         jenis_barang: "JASA SERVICE",
  //       },
  //       {
  //         no_urut: 2,
  //         kode_supplier: "SPL01",
  //         qty: 1,
  //         _id: "6034b6285baac72d97ee5d05",
  //         kode: "9831873183718",
  //         nama: "AKRAPOVIC TITANIUM",
  //         harga_satuan: 18000000,
  //         harga_total: 18000000,
  //         keterangan: "SERVICE KAKI",
  //         jenis_barang: "SPAREPART",
  //       },
  //       {
  //         no_urut: 3,
  //         kode_supplier: "-",
  //         qty: 1,
  //         _id: "6034b6285baac72d97ee5d06",
  //         kode: "ELECTRIC",
  //         nama: "PASANG SPEAKER",
  //         harga_satuan: 250000,
  //         harga_total: 250000,
  //         keterangan: "GANTI LAMPU",
  //         jenis_barang: "JASA SERVICE",
  //       },
  //       {
  //         no_urut: 4,
  //         kode_supplier: "SLP10",
  //         qty: 1,
  //         _id: "6034b6285baac72d97ee5d07",
  //         kode: "000000001",
  //         nama: "REM",
  //         harga_satuan: 180000,
  //         harga_total: 180000,
  //         keterangan: "ELECTRIC",
  //         jenis_barang: "SPAREPART",
  //       },
  //     ],
  //     __v: 0,
  //   },
  // ];
  let tableRowsBarang = [];
  let tableRowsService = [];
  let finalY = 30;
  let tableColumnService = [
    [
      {
        content: `SERVICE LIST`,
        colSpan: 5,
      },
    ],
    [
      {
        content: `NAMA`,
      },
      {
        content: `QTY`,
      },
      {
        content: `HARGA`,
      },
      {
        content: `TOTAL`,
      },
      {
        content: `KETERANGAN`,
      },
    ],
  ];
  let tableColumnBarang = [
    [
      {
        content: `SPAREPART`,
        colSpan: 5,
      },
    ],
    [
      {
        content: `NAMA`,
      },
      {
        content: `QTY`,
      },
      {
        content: `HARGA`,
      },
      {
        content: `TOTAL`,
      },
      {
        content: `KETERANGAN`,
      },
    ],
  ];
  data.forEach((barang, index) => {
    let tglservice = Moment(barang.tgl_service).format('DD/MM/YYYY');
    let tglmasuk = Moment(barang.tgl_masuk).format('DD/MM/YYYY');
    let tglkeluar = Moment(barang.tgl_keluar).format('DD/MM/YYYY');
    let tglselanjutnya = Moment(getNextDay()).format('DD/MM/YYYY');

    let tableColumn1 = [
      [
        {
          content: `TANGGAL : ${tglservice}`,
          colSpan: 1,
        },
        {
          content: `NO FAKTUR : ${barang.no_service} `,
          colSpan: 1,
        },
        {
          content: `MEKANIK : ${barang.mekanik}`,
          colSpan: 2,
        },
      ],
      [
        {
          content: `DATA PEMILIK`,
          colSpan: 2,
          styles: {
            fontStyle: "bold",
            fontSize: 9,
          },
        },
        {
          content: `DATA KENDARAAN`,
          colSpan: 2,
          styles: {
            fontStyle: "bold",
            fontSize: 9,
          },
        },
      ],
      [
        //   ROW 1
        {
          content: `NAMA : `,
        },
        {
          content: `${barang.nama_customer}`,
        },
        {
          content: `NOMOR POLISI: `,
        },
        {
          content: `${barang.nopol_kendaraan}`,
        },
      ],
      //   ROW 2
      [
        {
          content: `ALAMAT : `,
          rowSpan: 2,
        },
        {
          content: `${barang.alamat}`,
          rowSpan: 2,
        },
        {
          content: `MERK : `,
        },
        {
          content: `${barang.merk_kendaraan}`,
        },
      ],
      //   ROW 3
      [
        {
          content: `TYPE : `,
        },
        {
          content: `${barang.type_kendaraan}`,
        },
      ],
      //   ROW 4
      [
        {
          content: `KOTA : `,
        },
        {
          content: `${barang.kota}`,
        },
        {
          content: `WARNA : `,
        },
        {
          content: `${barang.warna_kendaraan}`,
        },
      ],
      //   ROW 5
      [
        {
          content: `NO HP : `,
        },
        {
          content: `${barang.handphone}`,
        },
        {
          content: `NO. MESIN : `,
        },
        {
          content: `${barang.nomesin_kendaraan}`,
        },
      ],
      // ROW 6   =======================================================================
      [
        {
          content: `============================================================================================================`,
          colSpan: 4,
        },
      ],
      //   ROW 7
      [
        {
          content: `TGL MASUK: `,
        },
        {
          content: `${tglmasuk}`,
        },
        {
          content: `TGL KELUAR : `,
        },
        {
          content: `${tglkeluar}`,
        },
      ],
      // ROW 8
      [
        {
          content: `KM MASUK : `,
        },
        {
          content: `${barang.km_masuk}`,
        },
        {
          content: `KM KELUAR: `,
        },
        {
          content: `${barang.km_keluar}`,
        },
      ],
      // ROW 9
      [
        {
          content: ` JDW SERVICE BERIKUTNYA : `,
        },
        {
          content: `${tglselanjutnya}`,
        },
        {
          content: `KM SERVICE BERIKUTNYA : `,
        },
        {
          content: `${barang.km_service}`,
        },
      ],
    ];
    // INISIALISASI TABEL DETAIL PELANGGAN
    doc.autoTable({
      body: tableColumn1,
      startY: 30,
      theme: "plain",
      rowPageBreak: "avoid",
      margin: { top: 20 },
      styles: {
        fontSize: 8,
        rowWidth: 15,
      },
    });
    finalY = doc.autoTableEndPosY() + 3;
    barang.detail_barang.forEach((item) => {
      let rows = [
        item.nama,
        item.qty,
        "Rp. " + item.harga_satuan.toLocaleString("ID-id"),
        "Rp. " + item.harga_total.toLocaleString("ID-id"),
        item.keterangan,
      ];
      if (item.jenis_barang === "JASA SERVICE") {
        tableRowsService.push(rows);
      } else {
        tableRowsBarang.push(rows);
      }
    });
    doc.autoTable({
      head: tableColumnService,
      body: tableRowsService,
      startY: finalY,
      theme: "plain",
      rowPageBreak: "avoid",
      pageBreak: "avoid",
      margin: { top: 20 },
      bodyStyles: { lineWidth: 0.02, lineColor: "#000" },
      headStyles: {
        lineWidth: 0.02,
        lineColor: "#000",
        fillColor: [212, 212, 211],
        valign: "middle",
        halign: "center",
      },
      styles: {
        fontSize: 8,
        rowWidth: 15,
      },
    });
    finalY = doc.autoTableEndPosY() + 3;
    doc.autoTable({
      head: tableColumnBarang,
      body: tableRowsBarang,
      startY: finalY,
      theme: "plain",
      rowPageBreak: "avoid",
      pageBreak: "avoid",
      margin: { top: 20 },
      bodyStyles: { lineWidth: 0.02, lineColor: "#000" },
      headStyles: {
        lineWidth: 0.02,
        lineColor: "#000",
        fillColor: [212, 212, 211],
        valign: "middle",
        halign: "center",
      },
      styles: {
        fontSize: 8,
        rowWidth: 15,
      },
    });
    finalY = doc.autoTableEndPosY() + 3;
    let footTable = [
      [
        {
          content: `Garansi pekerjaan berlaku 3 hari atau 300 km dari tanggal service, Kami tidak bertanggung jawab atas hilang atau terbuangnya suku cadang bekas, kalau tidak diambil dalam waktu 2 hari sejak tanggal perbaikan`,
          rowSpan: 6,
        },
        {
          content: `Sub Total`,
        },
        {
          content: `Rp. ${parseFloat(barang.sub_total).toLocaleString("id-ID")}`,
        },
      ],
      [
        {
          content: `Disc Part`,
        },
        {
          content: `Rp. ${parseFloat(barang.disk_part_rp).toLocaleString("id-ID")}`,
        },
      ],
      [
        {
          content: `Disc Jasa`,
        },
        {
          content: `Rp. ${parseFloat(barang.disk_jasa_rp).toLocaleString("id-ID")}`,
        },
      ],
      [
        {
          content: `Grand Total`,
        },
        {
          content: `Rp. ${parseFloat(barang.grand_total).toLocaleString("id-ID")}`,
        },
      ],
      [
        {
          content: `PPN 10%`,
        },
        {
          content: `Rp. ${parseFloat(barang.ppn).toLocaleString("id-ID")}`,
        },
      ],
      [
        {
          content: `Total Bayar`,
        },
        {
          content: `Rp. ${parseFloat(barang.total_bayar).toLocaleString("id-ID")}`,
        },
      ],
      [
        {
          content: `TERBILANG # ${angkaTerbilang(
            parseInt(barang.total_bayar)
          ).toUpperCase()} # RUPIAH`,
          styles: {
            fontStyle: "bold",
            fontSize: 9,
          },
          colSpan: 3,
        },
      ],
    ];
    doc.autoTable({
      body: footTable,
      startY: finalY,
      theme: "plain",
      rowPageBreak: "avoid",
      pageBreak: "avoid",
      margin: { top: 20 },
      //   bodyStyles: { lineWidth: 0.02, lineColor: "#000" },
      columnStyles: {
        0: { cellWidth: 132 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        // etc
      },
      styles: {
        fontSize: 8,
        rowWidth: 15,
      },
    });

    let signed = [
      [
        {
          content: `Sevice Advisor`,
          style: {
            halign: "center",
          },
        },
        {
          content: `Workshop Admin`,
          style: {
            halign: "center",
          },
        },
        {
          content: `Pemilik Kendaraan`,
          style: {
            halign: "center",
          },
        },
      ],
      //   CELL KOSONG
      [
        {
          content: ``,
          styles: {
            minCellHeight: 20,
          },
        },
        {
          content: ``,
          styles: {
            minCellHeight: 20,
          },
        },
        {
          content: ``,
          styles: {
            minCellHeight: 20,
          },
        },
      ],

      //   AKHIR CELL KOSONG
      [
        {
          content: `(...............................)`,
        },
        {
          content: `(...............................)`,
        },
        {
          content: `(...............................)`,
        },
      ],
    ];
    finalY = doc.autoTableEndPosY() + 3;
    doc.autoTable({
      body: signed,
      startY: finalY,
      theme: "plain",
      rowPageBreak: "avoid",
      pageBreak: "avoid",
      margin: { top: 20 },
      styles: {
        fontSize: 8,
      },
      bodyStyles: {
        valign: "middle",
        halign: "center",
      },
    });
  });

  // const date = Date().split(" ");
  // we use a date string to generate our filename.
  // const dateStr = date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left

  // doc.text(`User	: ${username}`, 14, finalY + 10);
  // doc.text(`Cetak	: ${tanggal}`, 14, finalY + 16);
  // doc.text(`Valid	: ${validby}`, 14, finalY + 22);

  // doc.autoPrint();
  // doc.save(`${title}_${dateStr}.pdf`);
  var string = doc.output("datauristring");
  var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
  var x = window.open();
  x.document.open();
  x.document.write(embed);
  x.document.close();
};

export default CetakFakturJual;
