<template>
  <div class="keranjang">
    <Navbar :updateKeranjang="keranjangs" />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/produk" class="text-dark"
                  >Detail Product</router-link
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Keranjang
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>Keranjang <strong>Saya</strong></h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Product</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(keranjang, index) in keranjangs"
                  :key="keranjang.id"
                >
                  <th>{{ index + 1 }}</th>
                  <td>
                    <img
                      :src="`../assets/images/${keranjang.products.gambar}`"
                      class="img-fluid shadow"
                      width="150px"
                    />
                  </td>
                  <td>
                    <strong>{{ keranjang.products.nama }}</strong>
                  </td>
                  <td>
                    {{ keranjang.keterangan ? keranjang.keterangan : "-" }}
                  </td>
                  <td align="center">{{ keranjang.jumlah_pemesanan }}</td>
                  <td align="right">
                    Rp. {{ keranjang.products.harga.toLocaleString() }}
                  </td>
                  <td align="right">
                    <strong
                      >Rp.
                      {{
                        keranjang.products.harga * keranjang.jumlah_pemesanan
                      }}</strong
                    >
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon-trash
                      @click="hapusKeranjang(keranjang.id)"
                    ></b-icon-trash>
                  </td>
                </tr>
                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga :</strong>
                  </td>
                  <td align="right">
                    <strong>Rp. {{ totalHarga.toLocaleString() }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--- Form Checkout --->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="nama">Nama :</label>
              <input type="text" class="form-control" v-model="pesan.nama" />
            </div>
            <div class="form-group">
              <label for="alamat">Alamat :</label>
              <textarea
                rows="3"
                v-model="pesan.alamat"
                class="form-control"
                placeholder="Masukan Alamat .."
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn btn-dark float-right"
              @click="checkout"
            >
              <b-icon-cart></b-icon-cart> Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "Keranjang",
  components: {
    Navbar,
  },
  data() {
    return {
      keranjangs: [],
      pesan: {},
    };
  },
  methods: {
    setKeranjangs(data) {
      this.keranjangs = data;
    },
    hapusKeranjang(id) {
      if (confirm("Apakah kamu ingin menghapus produk ini?")) {
        /** Delete data */
        axios
          .delete(
            "https://fake-server-sepatukuu-app.herokuapp.com/keranjangs/" + id
          )
          .then(() => {
            this.$toast.success("Berhasil menghapus produk.", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });

            /** Update data */
            axios
              .get("https://fake-server-sepatukuu-app.herokuapp.com/keranjangs")
              .then((response) =>
                // handle success
                //console.log(response);
                this.setKeranjangs(response.data)
              )
              .catch((error) =>
                // handle error
                console.log(error)
              );
          })
          .catch((error) =>
            // handle error
            console.log(error)
          );
      }
    },
    checkout() {
      if (this.pesan.nama && this.pesan.alamat) {
        this.pesan.keranjangs = this.keranjangs;
        axios
          .post(
            "https://fake-server-sepatukuu-app.herokuapp.com/pesanans",
            this.pesan
          )
          .then(() => {

            /** Hapus semua Keranjang **/
            this.keranjangs.map(function (item) {
              return axios.delete(
                "https://fake-server-sepatukuu-app.herokuapp.com/keranjangs/" +item.id)
                   .catch((error) =>
                    // handle error
                    console.log(error));
            });

            this.$router.push({ path: "/pesanan-sukses" });
            this.$toast.success("Berhasil Di pesan.", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((error) => console.log(error));
      } else {
        this.$toast.error("Nama dan Alamat harus diisi.", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  mounted() {
    axios
      .get("https://fake-server-sepatukuu-app.herokuapp.com/keranjangs")
      .then((response) =>
        // handle success
        //console.log(response);
        this.setKeranjangs(response.data)
      )
      .catch((error) =>
        // handle error
        console.log(error)
      );
  },
  computed: {
    totalHarga() {
      return this.keranjangs.reduce(function (items, data) {
        return items + data.products.harga * data.jumlah_pemesanan;
      }, 0);
    },
  },
};
</script>