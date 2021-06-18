<template>
  <div class="produk-detail">
    <Navbar />
    <div class="container">


    <!-- Breadcrumb -->
      <div class="row mt-5">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/" class="text-dark">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/produk" class="text-dark">Detail Product</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">
                Product Order
              </li>
            </ol>
          </nav>
        </div>
      </div>


      <div class="row mt-4">
        <div class="col-md-6">
            <img :src="`../assets/images/${ product.gambar }`" class="img-fluid shadow">
        </div>
        <div class="col-md-6">
            <h2><strong>{{ product.nama }}</strong></h2>
            <hr>
            <h4>Price IDR : <strong>Rp . {{ product.harga }}</strong></h4>
            <form>
                <div class="form-group">
                    <label for="jumlah_pesan">Jumlah Pesan</label>
                    <input type="number" class="form-control">
                </div>
                <div class="form-group">
                    <label for="keterangan">Keterangan</label>
                    <textarea name="" id="" cols="30" rows="10" class="form-control" placeholder="Keterangan, contoh: Warna, Ukuran"></textarea>
                </div>

                <button type="submit" class="btn btn-dark"><b-icon-cart></b-icon-cart> Pesan</button>
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
          product : {}
      }
  },
  methods: {
      setProduct(data){
          this.product = data
      }
  },
  mounted() {
    axios
      .get("http://localhost:3000/products/"+this.$route.params.id)
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