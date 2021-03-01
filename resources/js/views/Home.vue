<template>
    <div>
        <AddTask v-if="showAddTask" @add-task="addTask" />
        <Tasks :tasks="tasks" @delete-task="deleteTask" @toggle-reminder="toggleReminder" />
    </div>
</template>


<script>
import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'
export default {
    name: 'Home',
    props: {showAddTask: Boolean},
    components: {Tasks, AddTask},
    data(){
        return{
            tasks : [],
        }
    },
    methods: {
        // toggleAddTask(){
        //     this.showAddTask = !this.showAddTask
        // },
        addTask(newtask){
            axios.post('api/task/store', {task:newtask})
                .then(response => {
                    // console.log(response.data)
                    this.tasks = [response.data,...this.tasks]
                })
                .catch(error => {
                    console.log(error)
                });
            console.log(newtask);
        },
        toggleReminder(id){
            let task = this.tasks.filter((task)=>task.id == id)[0]
            // console.log(task.reminder)
            axios.put(`api/task/${id}`, {reminder: !Boolean(task.reminder)})
                .then(response => {
                    // console.log(response.data);
                    this.tasks = this.tasks.map((task)=>task.id == id
                  ? {...task, reminder:response.data.reminder}:task)
                })
                .catch(error => {
                    console.log(error);
                });
        },
        deleteTask(id){
            if(confirm('Are you sure?')){
                axios.delete(`api/task/${id}`, {
                    task:id
                })
                .then(response => {
                    // console.log(response)
                    // this.tasks = response.data;
                    response.status === 200 ? (this.tasks = this.tasks.filter((task)=>task.id !== id)) : alert('Error Deleting task')
                })
                .catch(error => {
                    console.log(error);
                });


                // const data = await res.json();
                // return data;
            }
        },
        fetchTasks(){
            axios.get('api/tasks')
                .then(response => {
                    // console.log(response.data)
                    this.tasks = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created(){
        this.fetchTasks();
    }
}
</script>
