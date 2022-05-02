<template>
      <canvas id="unity-canvas" width=960 height=600 style="width: 960px; height: 600px; background: #231F20"></canvas>
</template>

<script>
     let Unity = createUnityInstance(document.querySelector("#unity-canvas"), {
        dataUrl: "Build/Monopoly.data.unityweb",
        frameworkUrl: "Build/Monopoly.framework.js.unityweb",
        codeUrl: "Build/Monopoly.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "3a.Unistra",
        productName: "Strassopoly",
        productVersion: "rayan-80627-173886",
        // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
        // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
      });
</script>
<style></style>
