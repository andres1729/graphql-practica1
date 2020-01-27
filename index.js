const express = require('express');
const app = express();

const express_graphql = require('express-graphql');
const {buildSchema} = require('graphql');

//data
const {cursos} = require('./data.json');

const schema = buildSchema(`type Query {
    curso(id: Int!): Curso
    cursos(topic: String):[Curso]
}   
    type mutation{
        updateCursoTopic(id: Int!, topic:String): Curso

    }
    type Curso {
        id: Int
        title: String
        autor: String
        descriccion: String
        topic: String
        url: String
    }
`);

let getCurso = (args) => {
    let id = args.id;
    return cursos.filter(curso =>{
        return curso.id == id;
    })[0]
}

let getCursos = () => {
    if(args.topic){
        let topic = args.topic;
        return cursos.filter(curso => curso.topic == topic);
    }
};

let updateCursoTopic = ({id, topic}) => {
    cursos.map(cuso => {
        if(curso.id == id){
            curso.topic = topic;
            return curso;
        }
    });
    return cursos.filter(curso => curso.id ==id)[0]


}

const root = {
    curso: () => getCurso,
    cursos: () => getCursos,
    updateCursoTopic: updateCursoTopic
}
//definir interfaz de graphql
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true

}))

app.listen(3000, () => {
    console.log('server on port 3000');
})