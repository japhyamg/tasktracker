<template>
    <header>
        <h1>Task Tracker Laravel API</h1>
        <Button @btn-click="$emit('toggle-add-task')" text="Add Task" color="steelblue"  />
    </header>
</template>

<script>
import Button from './Button'
export default {
    name: 'Header',
    components : {Button},
    emits: ['toggle-add-task']
}
</script>

<style scoped>
    header{
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>
