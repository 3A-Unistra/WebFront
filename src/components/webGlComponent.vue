<template>
  <Header></Header>
<div id = "canvas-container">
  <canvas
    id="unity-canvas"
    width="960"
    height="600"
    style="width: 960px; height: 600px; background: #231f20"
  ></canvas>
</div>
  <Footer></Footer>
</template>

<script>
import Footer from "../components/MyFooter";
import Header from "../components/MyHeader";
export default {
  name: "WebGL",
  components: {
    Header,
    Footer,
  },

  mounted() {
    console.log("url :"+ process.env.VUE_APP_WEBGL_URL)
    // eslint-disable-next-line no-undef
    createUnityInstance(document.querySelector("#unity-canvas"), {
      dataUrl: process.env.VUE_APP_WEBGL_URL + "Monopoly.data.unityweb",
      frameworkUrl:
        process.env.VUE_APP_WEBGL_URL + "Monopoly.framework.js.unityweb",
      codeUrl: process.env.VUE_APP_WEBGL_URL + "Monopoly.wasm.unityweb",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "3a.Unistra",
      productName: "Strassopoly",
      productVersion: "rayan-80627-173886",
      // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
      // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
    }).then((unityInstance) => {
      unityInstance.SendMessage(
        "PersistentGameObject",
        "WebGLBootstrap",
        JSON.stringify({
          ip: process.env.VUE_APP_WEBSOCKET_URL_WEBGL,
          port: process.env.VUE_APP_WEBSOCKET_PORT,
          token: this.$store.state.token,
          game: this.$store.state.gameToken,
          uuid: this.$store.state.id,
          online: "0",
        })
      );
    });
  },
};
</script>
<style>

#canvas-container {
   width: 100%;
   text-align:center;
}

canvas {
   display: inline;
}
</style>
