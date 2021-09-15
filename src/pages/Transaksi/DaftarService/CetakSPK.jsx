import jsPDF from "jspdf";
import "jspdf-autotable";
import { getToday } from "../../../components/notification/function";
import { AxiosMasterGet } from "../../../axios";
import Moment from "moment";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakSPK = (data) => {
  // initialize jsPDF
  const doc = new jsPDF();
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  doc.setFontSize(15);
  doc.text("FAKTUR SPK", 14, 15);
  doc.setFontSize(10);

  //   let data = [
  //     {
  //       no_booking: "13495071",
  //       no_daftar: "SPK210227-0003",
  //       nopol_kendaraan: "D 6254 POL",
  //       tgl_masuk: "2021-02-27",
  //       km_masuk: "8000",
  //       tgl_keluar: "2021-02-27",
  //       km_keluar: "89999",
  //       jdw_service: "2021-02-27",
  //       km_service: "89999",
  //       keluhan: "TEST",
  //       id_mekanik: "P001",
  //       status_booking: true,
  //       detail_barang: [
  //         {
  //           kode_supplier: "-",
  //           kode: "SERVICE KAKI",
  //           nama: "SERVICE ACCU",
  //           qty: 1,
  //           harga_satuan: "500000",
  //           harga_total: "500000",
  //           keterangan: "KAKI PATAH",
  //           jenis_barang: "JASA SERVICE",
  //         },
  //         {
  //           kode_supplier: "SPL01",
  //           kode: "BRCD1234",
  //           nama: "ROLLER NMAX EDIT",
  //           qty: 1,
  //           harga_satuan: "1000000",
  //           harga_total: "1000000",
  //           keterangan: "SERVICE KAKI",
  //           jenis_barang: "SPAREPART",
  //         },
  //       ],
  //     },
  //   ];

  AxiosMasterGet(`customer/get/by-nopol/${data[0].nopol_kendaraan}`)
  .then(
    (res) => {
      console.log("tes",data);
      localStorage.setItem("detail_customer", JSON.stringify(res && res.data));

      let hasil = JSON.parse(localStorage.getItem("detail_customer")) || [];
      let tableRowsBarang = [];
      let tableRowsService = [];
      let finalY = 30;
      let tableColumnService = [
        [
          {
            content: `SERVICE LIST`,
            colSpan: 2,
          },
        ],
        [
          {
            content: `RINCIAN`,
          },
          {
            content: `KETERANGAN`,
          },
        ],
      ];
      console.log(hasil);
      let tgl = getToday();
      let tglspk = Moment(tgl).format('DD/MM/YYYY')
      data.forEach((barang, index) => {
        console.log(barang);
        
        let tableColumn1 = [
          [
            {
              content: `TANGGAL : ${tglspk}`,
              colSpan: 1,
            },
            {
              content: `NO FAKTUR : ${barang.no_daftar} `,
              colSpan: 1,
            },
            {
              content: `KODE MEKANIK : ${barang.id_mekanik}`,
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
              content: `${hasil.nama_customer}`,
            },
            {
              content: `NOMOR POLISI: `,
            },
            {
              content: `${hasil.nopol_kendaraan.nopol_kendaraan}`,
            },
          ],
          //   ROW 2
          [
            {
              content: `ALAMAT : `,
              rowSpan: 2,
            },
            {
              content: `${hasil.alamat}`,
              rowSpan: 2,
            },
            {
              content: `MERK : `,
            },
            {
              content: `${hasil.nopol_kendaraan.merk_kendaraan}`,
            },
          ],
          //   ROW 3
          [
            {
              content: `TYPE : `,
            },
            {
              content: `${hasil.nopol_kendaraan.type_kendaraan}`,
            },
          ],
          //   ROW 4
          [
            {
              content: `KOTA : `,
            },
            {
              content: `${hasil.kota}`,
            },
            {
              content: `WARNA : `,
            },
            {
              content: `${hasil.nopol_kendaraan.warna_kendaraan}`,
            },
          ],
          //   ROW 5
          [
            {
              content: `NO HP : `,
            },
            {
              content: `${hasil.handphone}`,
            },
            {
              content: `NO. MESIN : `,
            },
            {
              content: `${hasil.nopol_kendaraan.nomesin_kendaraan}`,
            },
          ],
          // ROW 6   =======================================================================
          [
            {
              content: `============================================================================================================`,
              colSpan: 4,
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
          let rows = [item.nama, item.keterangan];
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
        let signed = [
          [
            {
              content: `Supervisor Advisor`,
              style: {
                halign: "center",
              },
            },
            {
              content: `Mekanik`,
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
          ],

          //   AKHIR CELL KOSONG
          [
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
    }
  );
};

export default CetakSPK;
