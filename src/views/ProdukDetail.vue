<template>
  <div class="produk-detail">
    <Navbar />
    <div class="container">
      <!-- Breadcrumb -->
      <div class="row mt-5">
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
                Product Order
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-6">
          <img
            :src="`../assets/images/${product.gambar}`"
            class="img-fluid shadow detail-image"
          />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ product.nama }}</strong>
          </h2>
          <hr />
          <h4>
            Price IDR : <strong>Rp . {{ product.harga.toLocaleString() }}</strong>
          </h4>
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="jumlah_pemesanan">Jumlah Pesan</label>
              <input
                type="number"
                class="form-control"
                v-model="pesan.jumlah_pemesanan"
              />
            </div>
            <div class="form-group">
              <label for="keterangan">Keterangan</label>
              <textarea
                cols="30"
                rows="9"
                v-model="pesan.keterangan"
                class="form-control"
                placeholder="Keterangan, contoh: Warna, Ukuran"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-dark" @click="pemesanan">
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
  name: "ProdukDetail",
  components: {
    Navbar,
  },
  data() {
    return {
      product: {},
      pesan: {},
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },

    pemesanan() {
      /** Kondisi Jika form jumlah pemesanan kosong */
      if (this.pesan.jumlah_pemesanan) {
        this.pesan.products = this.product;
        axios
          .post("https://fake-server-sepatukuu-app.herokuapp.com/keranjangs", this.pesan)
          .then(() => {
            this.$router.push({ path : '/keranjang' })
            this.$toast.success("Berhasil masuk keranjang.", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((error) => console.log(error));
      } else {
        this.$toast.warning("Masukkan jumlah pemesanan.", {
          type: "warning",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  mounted() {
    axios
      .get("https://fake-server-sepatukuu-app.herokuapp.com/products/" + this.$route.params.id)
      .then((response) =>
        // handle success
        //console.log(response);
        this.setProduct(response.data)
      )
      .catch((error) =>
        // handle error
        console.log(error)
      );
  },
};
</script>