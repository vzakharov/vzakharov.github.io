<template>
  <Nuxt/>
</template>

<style>

  .close {
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: 0.5;
    margin-left: auto;
  }

  .close.nofloat {
    float: none;
  }

  .close:hover {
    color: #000;
    text-decoration: none;
  }
  .close:not(:disabled):not(.disabled):focus,
  .close:not(:disabled):not(.disabled):hover {
    opacity: 0.75;
  }
  button.close {
    padding: 0;
    background-color: transparent;
    border: 0;
  }
  
  a.close.disabled {
    pointer-events: none;
  }

  a.gray-link {
    color: #999;
    text-decoration: none;
  }

  /* Normal blue color if hovered */
  a.gray-link:hover {
    color: #0070f3;
  }

  /* stick to the top */
  .sticky-top {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #fff;
  }

  /* stick to the bottom */
  .sticky-bottom {
    position: sticky;
    bottom: 0;
    z-index: 1;
    background-color: #fff;
  }

</style>