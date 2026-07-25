<template>
  <SectionDivider title="Motion Design" />
    <div class="grid">
        <VideoPreviewCard
        class="v16-9"
        title="OBS - Starting Asset"
        stream="https://stream.mux.com/zppf2A7oG6NsFgKWVyOOkGvgnJ4H5MBifTcJmz01U1HQ.m3u8"
        />
    </div>
  <SectionDivider title="Montage" />
    <div class="grid" style="margin-bottom: 20px;">
        <VideoCard
        size="v16-9"
        title="Frogteam12 - Minecraft mais on obtient les blocs qu'on regarde..."
        date="6 Juil. 2026"
        stream="https://stream.mux.com/tK00CeDxKQMbKS8vW3TbyGFc4zwtyyrILPZ73SSMCMGQ.m3u8"
        link="https://www.youtube.com/watch?v=38naAf20sAc"
        />
    </div>
  <SectionDivider title="Tiktoks" />
    <div class="grid" style="background: #101013; border: solid 3px #101013; border-radius: 22px;">
      <VideoCard
      size="v9-16"
      title="Wivryx - Tiktok 1"
      date="25 avr. 2025"
      stream="https://stream.mux.com/P7GNLOq6GTETUzWHojRLYBAzOzNV9jvYIWlsWc2Pvng.m3u8"
      link="https://www.youtube.com/watch?v=pnWvW0SmjX0"
      />
      <VideoCard
      size="v9-16"
      title="Test tiktok 3"
      date="16 Dec, 2024"
      stream="https://stream.mux.com/01BmtGcvtAEz2tvS01U6PRWFv02mEHWXmQR5jJUYDJropU.m3u8"
      link="https://www.youtube.com/watch?v=Bd5AjCV6vNI"
      />
      <VideoCard
      size="v9-16"
      title="Devine les blocs #3 fr @ShinyyOff"
      date="23 mai 2026"
      stream="https://stream.mux.com/CTjKQ59mZPmk01rvpjw9j8hH01702QVfoQvWYdf6q8jal8.m3u8"
      link="https://www.youtube.com/watch?v=Mdh1N76gxRE"
      />
      <VideoCard
      size="v9-16"
      title="Bloc Télépathie #3 ft @ShinyyOff"
      date="10 mai 2026"
      stream="https://stream.mux.com/FerBzGLVH00x2j008vIj01rsps2G3y3fakSO9k3ZYnmwwQ.m3u8"
      link="https://www.youtube.com/watch?v=tjN6xZMBdrI"
      />
    </div>
  <SectionDivider title="3D" />
    <div class="grid">
      <PhotoCard
      title="Header"
      size="x2"
      link="/i/3D/KS-Header.jpg"
      />
      <PhotoCard
      title="PFP"
      size="x1"
      link="/i/3D/KS-PP8bit.jpg"
      />
      <PhotoCard
      title="Old PFP"
      size="x1"
      link="/i/3D/PP3.jpg"
      />
    </div>
  <SectionDivider title="DEV" />
    <div class="grid">
      <DevCard
      preview="/i/DEV/portfolio-pre.jpg"
      title="Ce portfolio"
      link="https://models.spriters-resource.com/wii/supermariogalaxy/asset/350012/"
      />
    </div>
</template>

<script setup>
import BentoCard from "./BentoCard.vue";
import VideoCard from "./VideoCard.vue";
import VideoPreviewCard from "./VideoPreviewCard.vue";
import PhotoCard from "./PhotoCard.vue";
import DevCard from "./DevCard.vue";
import SectionDivider from "./SectionDivider.vue";
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 0 auto;
}


@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 1500px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>