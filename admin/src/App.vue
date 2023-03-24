<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar{
  width: 5px;
  height: 5px;
  position: absolute;
}
::-webkit-scrollbar-thumb{
  background: #18900f;
}
::-webkit-scrollbar-track{
background: #ddd;
}
</style>
