import axios from 'axios'


function postIt() {
    axios.put('http://localhost:3000/api/student/66fbf10662c78091d113fba8/course/English',{grade:89})
        .then(res => console.log(res.data))
        .catch(err=>console.log(err))
}
postIt()
console.log('jsj')