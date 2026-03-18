<script setup>
let props = defineProps({
    color: {
        type: String,
        validator(value) {
            return [
                'primary',
                'link',
            ].includes(value)
        }
    },
    size: {
        type: String,
        validator(value) {
            return [
                'small',
                'large',
            ].includes(value)
        }
    },
    rounded: {
        type: Boolean,
        default: false,
    }
})

let classes = ""
if (props.color) {
    classes += ' is-' + props.color
}
if (props.size) {
    classes += ' is-' + props.size
}
if (props.rounded) {
    classes += ' is-rounded'
}
</script>

<template>
    <button class="button" :class="classes">
        <slot></slot>
    </button>
</template>