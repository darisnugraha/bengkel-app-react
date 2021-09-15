import React, { lazy } from "react";
import LaporanKartuHutangSupplier from "../pages/Laporan/LaporanSupplier/KartuHutangSupplier/LaporanKartuHutangSupplier.jsx";
import ReturBarangTidakJadiPakai from "../pages/Stoking/ReturBarangTidakJadiPakai/ReturBarangTidakJadiPakai.jsx";
import TambahStockBarang from "../pages/Stoking/TambahStockBarang/TambahStockBarang.jsx";
import ProgressService from "../pages/Transaksi/ProgressService/ProgressService.jsx";
// const MasterUkuran = lazy(() =>
//   import("../pages/DataMaster/DataUkurann/MasterUkuran.jsx")
// );
const MasterWarna = lazy(() =>
  import("../pages/DataMaster/DataWarna/MasterWarna.jsx")
);
const LaporanKeuanganBank = lazy(() =>
  import("../pages/Laporan/LaporanKeuangan/Bank/LaporanKeuanganBank.jsx")
);
const LaporanKeuanganKas = lazy(() =>
  import("../pages/Laporan/LaporanKeuangan/Kas/LaporanKeuanganKas.jsx")
);
const LaporanMedicalReport = lazy(() =>
  import("../pages/Laporan/LaporanMedicalReport/LaporanMedicalReport.jsx")
);
const LaporanMekanik = lazy(() =>
  import("../pages/Laporan/LaporanPenjualan/Mekanik/LaporanMekanik.jsx")
);
const LaporanPenjualanRongsok = lazy(() =>
  import(
    "../pages/Laporan/LaporanPenjualan/PenjualanRongsok/LaporanPenjualanRongsok.jsx"
  )
);
const LaporanPenjualanSales = lazy(() =>
  import(
    "../pages/Laporan/LaporanPenjualan/PenjualanSales/LaporanPenjualanSales.jsx"
  )
);
const LaporanPenjualanSparepart = lazy(() =>
  import(
    "../pages/Laporan/LaporanPenjualan/PenjualanSparepart/LaporanPenjualanSparepart.jsx"
  )
);
const LaporanService = lazy(() =>
  import("../pages/Laporan/LaporanPenjualan/Service/LaporanService.jsx")
);
const LaporanPembayaranCustomer = lazy(() =>
  import(
    "../pages/Laporan/LaporanPiutang/PembayaranCustomer/LaporanPembayaranCustomer.jsx"
  )
);
const LaporanPiutang = lazy(() =>
  import("../pages/Laporan/LaporanPiutang/Piutang/LaporanPiutang.jsx")
);
const LaporanReturnCustomer = lazy(() =>
  import(
    "../pages/Laporan/LaporanPiutang/ReturnCustomer/LaporanReturnCustomer.jsx"
  )
);
const LaporanKartuStock = lazy(() =>
  import(
    "../pages/Laporan/LaporanStock/LaporanKartuStock/LaporanKartuStock.jsx"
  )
);
const LaporanPengeluaranBarang = lazy(() =>
  import(
    "../pages/Laporan/LaporanStock/LaporanPengeluaranBarang/LaporanPengeluaranBarang.jsx"
  )
);
const LaporanStockPerKategori = lazy(() =>
  import(
    "../pages/Laporan/LaporanStock/LaporanStockPerKategori/LaporanStockPerKategori.jsx"
  )
);
const LaporanHutangSupplier = lazy(() =>
  import(
    "../pages/Laporan/LaporanSupplier/HutangSupplier/LaporanHutangSupplier.jsx"
  )
);
const LaporanPembayaranSupplier = lazy(() =>
  import(
    "../pages/Laporan/LaporanSupplier/PembayaranSupplier/LaporanPembayaranSupplier.jsx"
  )
);
const LaporanPenerimaanSupplier = lazy(() =>
  import(
    "../pages/Laporan/LaporanSupplier/PenerimaanSupplier/LaporanPenerimaanSupplier.jsx"
  )
);
const LaporanReturnSupplier = lazy(() =>
  import(
    "../pages/Laporan/LaporanSupplier/ReturnSupplier/LaporanReturnSupplier.jsx"
  )
);
// const MasterMerkBarang = lazy(() =>
//   import("../pages/DataMaster/DataMerkBarang/MasterMerkBarang.jsx")
// );
const MasterGudang = lazy(() =>
  import("../pages/DataMaster/DataGudang/MasterGudang.jsx")
);
const MasterJenisKunci = lazy(() =>
  import("../pages/DataMaster/DataJenisKunci/MasterJenisKunci.jsx")
);
const MasterKendaraan = lazy(() =>
  import("../pages/DataMaster/DataKendaraan/MasterKendaraan.jsx")
);
const MasterKunci = lazy(() =>
  import("../pages/DataMaster/DataKunci/MasterKunci.jsx")
);
// const MasterKwalitas = lazy(() =>
//   import("../pages/DataMaster/DataKwalitas/MasterKwalitas.jsx")
// );
const MasterRak = lazy(() =>
  import("../pages/DataMaster/DataRak/MasterRak.jsx")
);
const MasterSelfing = lazy(() =>
  import("../pages/DataMaster/DataSelfing/MasterSelfing.jsx")
);
const MasterSatuan = lazy(() =>
  import("../pages/DataMaster/DataUkuran/MasterSatuan.jsx")
);
const MasterBank = lazy(() =>
  import("../pages/DataMaster/DataBank/MasterBank.jsx")
);
const MasterParameterTransaksi = lazy(() =>
  import(
    "../pages/DataMaster/DataParameterTransaksi/MasterParameterTransaksi.jsx"
  )
);
const MasterKategoriService = lazy(() =>
  import("../pages/DataMaster/DataKategoriService/MasterKategoriService.jsx")
);
const MasterParameterDiscount = lazy(() =>
  import(
    "../pages/DataMaster/DataParameterDiscount/MasterParameterDiscount.jsx"
  )
);
const MasterParameterHargaService = lazy(() =>
  import(
    "../pages/DataMaster/DataParameterHargaService/MasterParameterHargaService.jsx"
  )
);
const MasterDivisi = lazy(() =>
  import("../pages/DataMaster/DataDivisi/MasterDivisi.jsx")
);
const MasterSales = lazy(() =>
  import("../pages/DataMaster/DataSales/MasterSales.jsx")
);
const MasterBarang = lazy(() =>
  import("../pages/DataMaster/DataBarang/MasterBarang.jsx")
);
const Barcode = lazy(() =>
  import("../pages/DataMaster/DataBarang/Barcode")
);
const MasterCustomer = lazy(() =>
  import("../pages/DataMaster/DataCustomer/MasterCustomer.jsx")
);
const MasterSupplier = lazy(() =>
  import("../pages/DataMaster/DataSupplier/MasterSupplier.jsx")
);
const ReturBarang = lazy(() =>
  import("../pages/Stoking/ReturBarangTidakJadiPakai/ReturBarangTidakJadiPakai.jsx")
);
const PermintaanBarang = lazy(() =>
  import("../pages/Stoking/PermintaanBarang/PermintaanBarang.jsx")
);
const PengeluaranBarang = lazy(() =>
  import("../pages/Stoking/PengeluaranBarang/PengeluaranBarang.jsx")
);
const KonversiBarang = lazy(() =>
  import("../pages/Stoking/KonversiBarang/KonversiBarang.jsx")
);
const HancurBarang = lazy(() =>
  import("../pages/Stoking/HancurBarang/HancurBarang.jsx")
);
const KunciBarang = lazy(() =>
  import("../pages/Stoking/KunciBarang/KunciBarang.jsx")
);
const BookingService = lazy(() =>
  import("../pages/Transaksi/BookingService/BookingService.jsx")
);
const DaftarService = lazy(() =>
  import("../pages/Transaksi/DaftarService/DaftarService.jsx")
);
const PembayaranService = lazy(() =>
  import("../pages/Transaksi/PembayaranService/PembayaranService.jsx")
);
const PembayaranSupplier = lazy(() =>
  import("../pages/Transaksi/PembayaranSupplier/PembayaranSupplier.jsx")
);
const LihatService = lazy(() =>
  import("../pages/Transaksi/LihatService/LihatService.jsx")
);
const ServiceLuar = lazy(() =>
  import("../pages/Transaksi/ServiceLuar/ServiceLuar.jsx")
);
const TerimaServiceLuar = lazy(() =>
  import("../pages/Transaksi/TerimaServiceLuar/TerimaServiceLuar.jsx")
);
const KomplainService = lazy(() =>
  import("../pages/Transaksi/Komplain/KomplainService.jsx")
);
const SupplierPenerimaan = lazy(() =>
  import("../pages/Transaksi/Supplier/SupplierPenerimaan.jsx")
);
const ReturnSupplier = lazy(() =>
  import("../pages/Transaksi/ReturnSupplier/ReturnSupplier.jsx")
);
const PenjualanSparepart = lazy(() =>
  import("../pages/Transaksi/PenjualanSparepart/PenjualanSparepart.jsx")
);
const PenjualanRongsok = lazy(() =>
  import("../pages/Transaksi/PenjualanRongsok/PenjualanRongsok.jsx")
);
const ReturnPenjualan = lazy(() =>
  import("../pages/Transaksi/ReturnPenjualan/ReturnPenjualan.jsx")
);
const PembayaranPiutang = lazy(() =>
  import("../pages/Transaksi/PembayaranPiutang/PembayaranPiutang.jsx")
);
const AmbilUangKas = lazy(() =>
  import("../pages/KasDanBank/AmbilKas/AmbilUangKas.jsx")
);
const TambahKas = lazy(() =>
  import("../pages/KasDanBank/TambahKas/TambahKas.jsx")
);
const AmbilBank = lazy(() =>
  import("../pages/KasDanBank/AmbilBank/AmbilBank.jsx")
);
const TambahBank = lazy(() =>
  import("../pages/KasDanBank/TambahBank/TambahBank.jsx")
);
const CreateUser = lazy(() =>
  import("../pages/Supervisor/ManageUser/CreateUser.jsx")
);
const HakAkses = lazy(() =>
  import("../pages/Supervisor/HakAkses/HakAkses.jsx")
);
const StockOpname = lazy(() =>
  import("../pages/StockOpname/StockOpname/StockOpname.jsx")
);
const LihatLaporanStockOpname = lazy(() =>
  import(
    "../pages/StockOpname/LihatLaporanStockOpname/LihatLaporanStockOpname.jsx"
  )
);
const InputDataMember = lazy(() =>
  import("../pages/Member/InputDataMember/InputDataMember.jsx")
);
const ParameterPoint = lazy(() =>
  import("../pages/Member/ParameterPoint/ParemeterPoint.jsx")
);
const DaftarHadiah = lazy(() =>
  import("../pages/Member/DaftarHadiah/DaftarHadiah.jsx")
);
const TukarPoint = lazy(() =>
  import("../pages/Member/TukarPoint/TukarPoint.jsx")
);
const TambahPointManual = lazy(() =>
  import("../pages/Member/TambahPointManual/TambahPointManual.jsx")
);
const LaporanPermintaanBarang = lazy(() =>
  import(
    "../pages/Laporan/LaporanStock/LaporanPermintaanBarang/LaporanPermintaanBarang.jsx"
  )
);

//Data Master
const MasterJenis = lazy(() =>
  import("../pages/DataMaster/DataJenis/MasterJenis.jsx")
);
const Dashboard = lazy(() => import("../pages/Dasboard/dashboard.jsx"));
const MasterKategori = lazy(() =>
  import("../pages/DataMaster/DataKategori/MasterKategori.jsx")
);
//End Data Master

//Login
const Login = lazy(() => import("../pages/auth/login.jsx"));

const routes = [
  //Login
  {
    path: "/",
    exact: true,
    title: "Login",
    component: () => <Login />,
  },

  //Dashboard
  {
    path: "/dashboard",
    exact: true,
    title: "Dashboard",
    component: () => <Dashboard />,
  },

  // Data Master
  {
    path: "/master-kategori",
    exact: true,
    title: "Master Kategori",
    component: () => <MasterKategori />,
  },

  // Data Jenis
  {
    path: "/master-jenis",
    exact: true,
    title: "Master Jenis",
    component: () => <MasterJenis />,
  },

  // Data Merek Kendaraan
  {
    path: "/master-kendaraan",
    exact: true,
    title: "Master Kendaraan",
    component: () => <MasterKendaraan />,
  },
  
  // Data Merek Barang
  // {
  //   path: "/master-merk-barang",
  //   exact: true,
  //   title: "Master Barang",
  //   component: () => <MasterMerkBarang />,
  // },
  // Data Gudang
  {
    path: "/master-gudang",
    exact: true,
    title: "Master Gudang",
    component: () => <MasterGudang />,
  },
  // Data Rak
  {
    path: "/master-rak",
    exact: true,
    title: "Master Rak",
    component: () => <MasterRak />,
  },
  // Data Selving
  {
    path: "/master-shelving",
    exact: true,
    title: "Master Shelving",
    component: () => <MasterSelfing />,
  },
  // Data Ukuran
  {
    path: "/master-satuan",
    exact: true,
    title: "Master Satuan",
    component: () => <MasterSatuan />,
  },
  // Data Kwalitas
  // {
  //   path: "/master-kualitas",
  //   exact: true,
  //   title: "Master Kualitas",
  //   component: () => <MasterKwalitas />,
  // },
  // Data Jenis Kunci
  {
    path: "/master-jenis-kunci",
    exact: true,
    title: "Master Jenis Kunci",
    component: () => <MasterJenisKunci />,
  },
  // Data Kunci
  {
    path: "/master-data-kunci",
    exact: true,
    title: "Master Kunci",
    component: () => <MasterKunci />,
  },
  // Data Bank
  {
    path: "/master-bank",
    exact: true,
    title: "Master Bank",
    component: () => <MasterBank />,
  },
  // Data Parameter
  {
    path: "/master-parameter-transaksi",
    exact: true,
    title: "Master Parameter Transaksi",
    component: () => <MasterParameterTransaksi />,
  },
  // Data Kategori Service
  {
    path: "/master-kategori-service",
    exact: true,
    title: "Master Kategori Service",
    component: () => <MasterKategoriService />,
  },
  // Data Discount
  {
    path: "/master-discount",
    exact: true,
    title: "Master Discount",
    component: () => <MasterParameterDiscount />,
  },
  // Data Harga Service
  {
    path: "/master-harga-service",
    exact: true,
    title: "Master Harga Service",
    component: () => <MasterParameterHargaService />,
  },
  // Data DIvisi
  {
    path: "/master-divisi",
    exact: true,
    title: "Master Divisi",
    component: () => <MasterDivisi />,
  },
  // Data Sales
  {
    path: "/master-sales",
    exact: true,
    title: "Master Sales",
    component: () => <MasterSales />,
  },
  // Data Barang
  {
    path: "/master-barang",
    exact: true,
    title: "Master Barang",
    component: () => <MasterBarang />,
  },
  {
    path: "/master-barcode",
    exact: true,
    title: "Barcode Barang",
    component: () => <Barcode />,
  },
  // Data Barang
  {
    path: "/master-customer",
    exact: true,
    title: "Master Customer",
    component: () => <MasterCustomer />,
  },
  // Data Supplier
  {
    path: "/master-supplier",
    exact: true,
    title: "Master Supplier",
    component: () => <MasterSupplier />,
  },
  // Stoking Penerimaan
  {
    path: "/service-permintaan",
    exact: true,
    title: "Permintaan Barang",
    component: () => <PermintaanBarang />,
  },
  // Stoking Penerimaan
  {
    path: "/service-pengeluaran",
    exact: true,
    title: "Pengeluaran Barang",
    component: () => <PengeluaranBarang />,
  },
  {
    path: "/service-edit",
    exact: true,
    title: "Edit Data Service",
    component: () => <ReturBarangTidakJadiPakai />,
  },
  // Stoking Konversi
  {
    path: "/stocking-konversi",
    exact: true,
    title: "Stocking Konversi",
    component: () => <KonversiBarang />,
  },
  // Stoking Konversi
  {
    path: "/stocking-hancur",
    exact: true,
    title: "Stocking Hancur",
    component: () => <HancurBarang />,
  },
  // Stoking Konversi
  {
    path: "/stocking-tambah",
    exact: true,
    title: "Tambah Stock Barang",
    component: () => <TambahStockBarang />,
  },
  // Stoking Kunci
  {
    path: "/stocking-kunci",
    exact: true,
    title: "Stocking Kunci",
    component: () => <KunciBarang />,
  },
  // Stoking Kunci
  {
    path: "/service-booking",
    exact: true,
    title: "Service Booking",
    component: () => <BookingService />,
  },
  // Stoking Kunci
  {
    path: "/service-daftar",
    exact: true,
    title: "Service Daftar",
    component: () => <DaftarService />,
  },
  {
    path: "/service-bayar",
    exact: true,
    title: "Service Bayar",
    component: () => <PembayaranService />,
  },
  {
    path: "/pembayaran-supplier",
    exact: true,
    title: "Pembayaran Supplier",
    component: () => <PembayaranSupplier />,
  },
  {
    path: "/service-lihat",
    exact: true,
    title: "Service Lihat",
    component: () => <LihatService />,
  },
  {
    path: "/service-progress",
    exact: true,
    title: "Progress Service",
    component: () => <ProgressService />,
  },
  {
    path: "/service-luar",
    exact: true,
    title: "Service luar",
    component: () => <ServiceLuar />,
  },
  {
    path: "/service-terima-luar",
    exact: true,
    title: "Terima Service Luar",
    component: () => <TerimaServiceLuar />,
  },
  {
    path: "/service-komplain",
    exact: true,
    title: "Komplain Service",
    component: () => <KomplainService />,
  },
  {
    path: "/supplier-terima",
    exact: true,
    title: "Penerimaan Supplier",
    component: () => <SupplierPenerimaan />,
  },
  {
    path: "/supplier-return",
    exact: true,
    title: "Return Supplier",
    component: () => <ReturnSupplier />,
  },
  {
    path: "/penjualan-sparepart",
    exact: true,
    title: "Penjualan Sparepart",
    component: () => <PenjualanSparepart />,
  },
  {
    path: "/penjualan-rongsok",
    exact: true,
    title: "Penjualan Rongsok",
    component: () => <PenjualanRongsok />,
  },
  {
    path: "/penjualan-return",
    exact: true,
    title: "Return Penjualan",
    component: () => <ReturnPenjualan />,
  },
  {
    path: "/penjualan-pembayaran",
    exact: true,
    title: "Pembayaran Piutang",
    component: () => <PembayaranPiutang />,
  },
  {
    path: "/ambil-kas",
    exact: true,
    title: "Ambil Uang Kas",
    component: () => <AmbilUangKas />,
  },
  {
    path: "/tambah-kas",
    exact: true,
    title: "Tambah Uang Kas",
    component: () => <TambahKas />,
  },
  {
    path: "/ambil-bank",
    exact: true,
    title: "Ambil Saldo Bank",
    component: () => <AmbilBank />,
  },
  {
    path: "/tambah-bank",
    exact: true,
    title: "Tambah Saldo Bank",
    component: () => <TambahBank />,
  },
  {
    path: "/add-user",
    exact: true,
    title: "Tambah User",
    component: () => <CreateUser />,
  },
  {
    path: "/hak-akses",
    exact: true,
    title: "Hak Akses User",
    component: () => <HakAkses />,
  },
  {
    path: "/stockopname-tambah",
    exact: true,
    title: "Stock Opname",
    component: () => <StockOpname />,
  },
  {
    path: "/laporan-stockopname",
    exact: true,
    title: "Laporan Hasil Stock Opname",
    component: () => <LihatLaporanStockOpname />,
  },
  {
    path: "/input-data-member",
    exact: true,
    title: "Input Data Member",
    component: () => <InputDataMember />,
  },
  {
    path: "/parameter-point",
    exact: true,
    title: "Parameter Point",
    component: () => <ParameterPoint />,
  },
  {
    path: "/parameter-hadiah",
    exact: true,
    title: "Daftar Hadiah",
    component: () => <DaftarHadiah />,
  },
  {
    path: "/parameter-tukar",
    exact: true,
    title: "Tukar Hadiah",
    component: () => <TukarPoint />,
  },
  {
    path: "/parameter-tambah-manual",
    exact: true,
    title: "Tambah/Ambil Point Manual",
    component: () => <TambahPointManual />,
  },
  {
    path: "/laporan-permintaan-barang",
    exact: true,
    title: "Laporan Permintaan barang",
    component: () => <LaporanPermintaanBarang />,
  },
  {
    path: "/laporan-pengeluaran-barang",
    exact: true,
    title: "Laporan Pengeluaran barang",
    component: () => <LaporanPengeluaranBarang />,
  },
  {
    path: "/laporan-stock-perkategori",
    exact: true,
    title: "Laporan Stock Per Kategori",
    component: () => <LaporanKartuStock />,
  },
  {
    path: "/laporan-kartu-stock",
    exact: true,
    title: "Laporan Kartu Stock",
    component: () => <LaporanStockPerKategori />,
  },
  {
    path: "/laporan-penerimaan-supplier",
    exact: true,
    title: "Laporan Penerimaan Supplier",
    component: () => <LaporanPenerimaanSupplier />,
  },
  {
    path: "/laporan-return-supplier",
    exact: true,
    title: "Laporan Return Supplier",
    component: () => <LaporanReturnSupplier />,
  },
  {
    path: "/laporan-hutang-supplier",
    exact: true,
    title: "Laporan Hutang Supplier",
    component: () => <LaporanHutangSupplier />,
  },
  {
    path: "/laporan-kartu-hutang-supplier",
    exact: true,
    title: "Laporan Kartu Hutang Supplier",
    component: () => <LaporanKartuHutangSupplier />,
  },
  {
    path: "/laporan-pembayaran-supplier",
    exact: true,
    title: "Laporan Pembayaran Supplier",
    component: () => <LaporanPembayaranSupplier />,
  },
  {
    path: "/laporan-penjualan-sparepart",
    exact: true,
    title: "Laporan Penjualan Sparepart",
    component: () => <LaporanPenjualanSparepart />,
  },
  {
    path: "/laporan-penjualan-sales",
    exact: true,
    title: "Laporan Penjualan Sales",
    component: () => <LaporanPenjualanSales />,
  },
  {
    path: "/laporan-mekanik",
    exact: true,
    title: "Laporan Mekanik",
    component: () => <LaporanMekanik />,
  },
  {
    path: "/laporan-penjualan-rongsok",
    exact: true,
    title: "Laporan Penjualan Rongsok",
    component: () => <LaporanPenjualanRongsok />,
  },
  {
    path: "/laporan-penjualan-service",
    exact: true,
    title: "Laporan Service",
    component: () => <LaporanService />,
  },
  {
    path: "/laporan-piutang",
    exact: true,
    title: "Laporan Piutang",
    component: () => <LaporanPiutang />,
  },
  {
    path: "/laporan-return-customer",
    exact: true,
    title: "Laporan Return Customer",
    component: () => <LaporanReturnCustomer />,
  },
  {
    path: "/laporan-pembayaran-customer",
    exact: true,
    title: "Laporan Pembayaran Customer",
    component: () => <LaporanPembayaranCustomer />,
  },
  {
    path: "/laporan-keuangan-kas",
    exact: true,
    title: "Laporan Keuangna Kas",
    component: () => <LaporanKeuanganKas />,
  },
  {
    path: "/laporan-keuangan-bank",
    exact: true,
    title: "Laporan Keuangna Bank",
    component: () => <LaporanKeuanganBank />,
  },
  {
    path: "/laporan-medical",
    exact: true,
    title: "Medical Report",
    component: () => <LaporanMedicalReport />,
  },
  {
    path: "/master-warna",
    exact: true,
    title: "Master Warna",
    component: () => <MasterWarna />,
  },
  // {
  //   path: "/master-ukuran",
  //   exact: true,
  //   title: "Master Ukuran",
  //   component: () => <MasterUkuran />,
  // },
];

export default routes;
