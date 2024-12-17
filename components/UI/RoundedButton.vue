<template>
    <button class="btn btn-primary">
        <slot />
    </button>
</template>

<style lang="scss" scoped>

button{
    width: 245px;
    height: 50px;
    border-radius: 90px;
    margin: 50px 0 100px 0;
}
button:hover{
    h6{
        color: black;
    }
    background-color: transparent;
}

</style>