<template>
   <div class="hero">

        <!--- Desktop -->
        <div class="d-none d-md-block">
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="d-flex h-100">
                        <div class="justify-content-center align-self-center">
                            <h2><strong>Sneakers Market</strong>, <br>bringing back the passion to explore.</h2>
                            <p>Pilih sepatu terbaik sesuai seleramu, disini!</p>
                            <router-link to="/produk" class="btn btn-lg btn-dark"><b-icon-arrow-right></b-icon-arrow-right> Pesan</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <img src="../assets/images/sepatuku.png" width="100%"/>
                </div>
            </div>
        </div>
       

        <!--- Mobile -->
        <div class="d-sm-block d-md-none">
            <div class="row mt-3">
                <div class="col-md-6 mb-3">
                    <img src="../assets/images/sepatuku.png" width="100%"/>
                </div>
                <div class="col-md-6">
                    <div class="d-flex h-100">
                        <div class="justify-content-center align-self-center">
                            <h2><strong>Sneakers Market</strong>, <br>bringing back the passion to explore.</h2>
                            <p>Pilih sepatu terbaik sesuai seleramu, disini!</p>
                            <router-link to="/produk" class="btn btn-lg btn-dark"><b-icon-arrow-right></b-icon-arrow-right> Pesan</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
   
</template>

<script>
export default {
    name : 'Hero'
}
</script>

<style>

</style>