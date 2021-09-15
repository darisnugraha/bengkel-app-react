const Menu = [
  {
    path: "/dashboard",
    icon: "fa fa-th",
    title: "Dashboard",
  },

  {
    path: "#",
    icon: "fa fa-database",
    title: "Master",
    children: [
      { path: "master-kategori", title: "Kategori" },
      { path: "master-jenis", title: "Jenis" },
      {
        path: "master-kendaraan",
        title: "Merek Kendaraan",
      },
      {
        path: "#",
        title: "Lokasi",
        children: [
          { path: "master-gudang", title: "Gudang" },
          { path: "master-rak", title: "Rak" },
          { path: "master-shelving", title: "Shelving" },
        ],
      },
      { path: "master-satuan", title: "Satuan" },
      // { path: "master-kualitas", title: "Kualitas" },
      // { path: "master-ukuran", title: "Ukuran" },
      { path: "master-warna", title: "Warna" },
      {
        path: "#",
        title: "Kunci",
        children: [
          { path: "master-jenis-kunci", title: "Jenis Kunci" },
          { path: "master-data-kunci", title: "Data Kunci" },
        ],
      },
      { path: "master-bank", title: "Bank" },
      { path: "master-barang", title: "Barang" },
      { path: "master-barcode", title: "Barcode Barang" },
      {
        path: "#",
        title: "Sales & Mekanik",
        children: [
          { path: "master-divisi", title: "Divisi" },
          { path: "master-sales", title: "Sales & Mekanik" },
        ],
      },
      { path: "master-parameter-transaksi", title: "Parameter Transaksi" },
      { path: "master-kategori-service", title: "Kategori Service" },
      { path: "master-customer", title: "Customer" },
      { path: "master-discount", title: "Discount" },
      { path: "master-harga-service", title: "Harga Service" },
      { path: "master-supplier", title: "Supplier" },
      // { path: "#", title: "Service List" },
    ],
  },
  {
    path: "#",
    icon: "fa fa-hdd",
    title: "Stocking",
    children: [
      { path: "stocking-konversi", title: "Konversi Barang" },
      { path: "stocking-hancur", title: "Hancur Barang" },
      { path: "stocking-tambah", title: "Tambah Stock Barang" },
      // { path: "stocking-kunci", title: "Kunci Barang" },
    ],
  },
  {
    path: "#",
    icon: "fa fa-money-bill-alt",
    title: "Transaksi",
    children: [
      {
        path: "#",
        title: "Service",
        children: [
          { path: "service-booking", title: "Booking Service" },
          { path: "service-daftar", title: "Daftar Service" },
          { path: "service-permintaan", title: "Permintaan Barang" },
          { path: "service-pengeluaran", title: "Pengeluaran Barang" },
          { path: "service-edit", title: "Edit Data Service"},
          { path: "service-bayar", title: "Bayar Service" },
          { path: "service-lihat", title: "Lihat Service" },
          { path: "service-luar", title: "Kirim Service Luar" },
          { path: "service-terima-luar", title: "Terima Service Luar" },
          { path: "service-komplain", title: "Komplain" },
        ],
      },
      {
        path: "#",
        title: "Supplier",
        children: [
          { path: "supplier-terima", title: "Penerimaan Barang Supplier" },
          { path: "supplier-return", title: "Retur Supplier" },
          { path: "pembayaran-supplier", title: "Pembayaran Supplier" },
        ],
      },
      {
        path: "#",
        title: "Penjualan",
        children: [
          { path: "penjualan-sparepart", title: "Penjualan Sparepart" },
          { path: "penjualan-rongsok", title: "Penjualan Barang Rongsok" },
          // { path: "penjualan-return", title: "Retur Penjualan" },
          { path: "penjualan-pembayaran", title: "Pembayaran Piutang" },
        ],
      },
    ],
  },
  {
    path: "#",
    icon: "fa fa-dollar-sign",
    title: "Kas Dan Bank",
    children: [
      {
        path: "#",
        title: "Transaksi Kas",
        children: [
          { path: "tambah-kas", title: "Tambah Uang Kas" },
          { path: "ambil-kas", title: "Ambil Uang Kas" },
        ],
      },
      {
        path: "#",
        title: "Transaksi Bank",
        children: [
          { path: "tambah-bank", title: "Tambah Uang Bank" },
          { path: "ambil-bank", title: "Ambil Uang Bank" },
        ],
      },
    ],
  },
  {
    path: "#",
    icon: "fa fa-chart-bar",
    title: "Laporan",
    children: [
      {
        path: "#",
        title: "Laporan Stock",
        children: [
          {
            path: "laporan-permintaan-barang",
            title: "Laporan permintaan Barang",
          },
          {
            path: "laporan-pengeluaran-barang",
            title: "Laporan Pengeluaran Barang",
          },
          {
            path: "laporan-stock-perkategori",
            title: "Laporan Stock Per Kategori",
          },
          { path: "laporan-kartu-stock", title: "Laporan Kartu Stock" },
        ],
      },
      {
        path: "#",
        title: "Laporan Supplier",
        children: [
          {
            path: "laporan-penerimaan-supplier",
            title: "Laporan Penerimaan Supplier",
          },
          { path: "laporan-return-supplier", title: "Laporan Retur Supplier" },
          { path: "laporan-hutang-supplier", title: "Laporan Hutang Supplier" },
          {
            path: "laporan-kartu-hutang-supplier",
            title: "Laporan Kartu Hutang Supplier",
          },
          // { path: "#", title: "Laporan Omset Supplier" },
          {
            path: "laporan-pembayaran-supplier",
            title: "Laporan Pembayaran Supplier",
          },
        ],
      },
      {
        path: "#",
        title: "Laporan Penjualan",
        children: [
          {
            path: "laporan-penjualan-sparepart",
            title: "Laporan Penjualan Sparepart",
          },
          { path: "laporan-penjualan-sales", title: "Laporan Penjualan Sales" },
          { path: "laporan-mekanik", title: "Laporan Mekanik" },
          {
            path: "laporan-penjualan-rongsok",
            title: "Laporan Penjualan Rongsok",
          },
          { path: "laporan-penjualan-service", title: "Laporan Service" },
        ],
      },
      {
        path: "#",
        title: "Laporan Piutang",
        children: [
          { path: "laporan-piutang", title: "Laporan Piutang" },
          { path: "laporan-return-customer", title: "Laporan Retur Customer" },
          {
            path: "laporan-pembayaran-customer",
            title: "Laporan Pembayaran Piutang",
          },
        ],
      },
      {
        path: "#",
        title: "Laporan Keuangan",
        children: [
          { path: "laporan-keuangan-kas", title: "Laporan Uang Kas" },
          { path: "laporan-keuangan-bank", title: "Laporan Uang Bank" },
        ],
      },
      {
        path: "laporan-medical",
        title: "Medical Report",
      },
      // {
      //   path: "#",
      //   title: "Laporan Member",
      //   children: [
      //     { path: "#", title: "Laporan Data Member" },
      //     { path: "#", title: "Laporan Transaksi Member" },
      //     { path: "#", title: "Laporan Tukar Poin" },
      //   ],
      // },
    ],
  },
  {
    path: "#",
    icon: "fa fa-users",
    title: "Supervisor",
    children: [
      // {
      //   path: "#",
      //   title: "Manage Data",
      //   children: [{ path: "#", title: "Backup Data" }],
      // },
      {
        path: "#",
        title: "Manage User",
        children: [
          { path: "add-user", title: "Create / Edit User" },
          { path: "hak-akses", title: "Hak Akses" },
        ],
      },
      // { path: "#", title: "Setting Printer" },
      // { path: "#", title: "Setting System" },
    ],
  },
  {
    path: "#",
    icon: "fa fa-tasks",
    title: "Stock Opname",
    children: [
      { path: "stockopname-tambah", title: "Stock Opname" },
      { path: "laporan-stockopname", title: "Laporan Hasil Stock Opname" },
    ],
  },
  {
    path: "#",
    icon: "fa fa-user",
    title: "Member",
    children: [
      { path: "input-data-member", title: "Input Data Member" },
      { path: "parameter-point", title: "Parameter Point" },
      { path: "parameter-hadiah", title: "Daftar Hadiah" },
      { path: "parameter-tukar", title: "Tukar Point" },
      { path: "parameter-tambah-manual", title: "Tambah / Ambil Point Manual" },
    ],
  },
];

export default Menu;
