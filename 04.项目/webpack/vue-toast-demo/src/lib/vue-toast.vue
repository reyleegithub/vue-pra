<template>
    <section class="toast-container" :class="[visible?'fade-in':'fade-out']">
        <div class="toast">
            <span>{{message}}</span>
        </div>
    </section>
</template>

<script>
    import "./toast.css"

    export default {
        data() {
            return {
                visible: false,
                message: ""
            }
        }
    }
</script>


