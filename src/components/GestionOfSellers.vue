<template>
  <div class="cv-container">
    <div class="header">
      <h1>{{ cvData.nombre }}</h1>
      <h2>{{ cvData.titulo }}</h2>
      <p>{{ cvData.presentacion }}</p>
    </div>

    <div class="section">
      <h2>Experiencia Profesional</h2>
      <ul>
        <li v-for="(experience, index) in cvData.experiencia" :key="index" class="experience-item">
          <div class="experience-header">
            <strong>{{ experience.cargo }}</strong>
            <p>{{ experience.empresa }} - {{ experience.fecha }}</p>
          </div>
          <ul class="experience-details">
            <li v-for="(detail, detailIndex) in experience.detalles" :key="detailIndex">{{ detail }}</li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="section">
      <h2>Formación</h2>
      <ul>
        <li v-for="(education, index) in cvData.formacion" :key="index">
          <strong>{{ education.titulo }}</strong>
          <p>{{ education.fecha }} - {{ education.detalle }}</p>
        </li>
      </ul>
    </div>

    <div class="section">
      <h2>Competencias</h2>
      <ul class="competences-list">
        <li v-for="(competence, index) in cvData.competencias" :key="index">{{ competence }}</li>
      </ul>
    </div>

    <div class="section">
      <h2>Idiomas</h2>
      <ul class="languages-list">
        <li v-for="(language, index) in cvData.idiomas" :key="index">{{ language.nombre }}: {{ language.nivel }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cvData: {
        nombre: "Andy Oswaldo Alvia Choez",
        titulo: "Ingeniero en Sistemas",
        presentacion:
          "Soy un ingeniero en sistemas con más de 7 años de experiencia en desarrollo de software...",
        experiencia: [
          {
            cargo: "Programador Jr",
            empresa: "UESS",
            fecha: "Jun 2018 - Jun 2019",
            detalles: [
              "Experiencia en el desarrollo de proyectos utilizando herramientas como Prestashop, Laravel, Bootstrap, PHP, HTML, CSS, JS, NodeJs y Angular.",
              "Amplio conocimiento en la creación de procedimientos PL/SQL.",
              "Capacidad para generar informes de respuesta a los casos.",
              "Experiencia en la modificación del sistema web de Claro, con conocimientos básicos en SOAP UI y Spring Boot.",
              "Resultados demostrables en la entrega de proyectos de alta calidad y cumplimiento de plazos establecidos.",
            ],
          },
           {
            cargo: "Programador Web",
            empresa: "LINK DIGITAL DIGITALKN S.A",
            fecha: "Jul 2019 - Jun 2020",
            detalles: [
              "Participación en proyectos destacados como miclaro web, mi claro móvil, app móvil, tienda claro, ganagol, raspadita y proveedores claro.",
              "Especializado en el uso de herramientas como symfony, php, vue js y angular.",
            ],
          },
           {
            cargo: "Programador",
            empresa: "247EC S.A.",
            fecha: "Ago 2020 - Ago 2022",
            detalles: [
              "Experiencia en el desarrollo de aplicaciones web utilizando herramientas como php, Programación mongodb, Angular js, node js y Prestashop.",
              "Amplio conocimiento en la programación personalizada para diversos clientes, incluyendo empresas como Rialto, Ecuaceramicas, Synteko, Santyn Distribuciones, JEP, Toyota, Importadora Larrea y Certero.",
            ],
          },
           {
            cargo: "Programador",
            empresa: "Ndevelopers",
            fecha: "Dic 2022 – Actualidad",
            detalles: [
              "Experiencia en el desarrollo de aplicaciones utilizando herramientas de vanguardia como Angular, Node.js, Express, Sails, NestJS, React y PostgreSQL.",
              "Soporte y mantenimiento de sistemas web para clínicas, cumpliendo con los estándares establecidos por el Ministerio de Salud Pública del Ecuador y el IESS..",
            ],
          },
          // Agregar más experiencias según sea necesario
        ],
        formacion: [
          {
            titulo: "TÍTULO DE EDUCACIÓN SECUNDARIA - ALEJANDRO INTERNACIONAL",
            fecha: "2012",
            detalle: "Bachiller Técnico en Aplicaciones Informáticas",
          },
          {
            titulo: "TÍTULO UNIVERSITARO - UNIVERSIDAD ESTATAL DE GUAYAQUIL",
            fecha: "2017",
            detalle: "Ingeniería en Sistemas Computacionales",
          },
        ],
        competencias: ["Manejo del estrés", "Solución de problemas", "Trabajo en equipo"],
        idiomas: [
          { nombre: "Inglés", nivel: "Intermedio" },
          { nombre: "Español", nivel: "Nativo" },
        ],
      },
    };
  },
};
</script>
<style scoped>
.cv-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.section {
  margin-bottom: 30px;
}

.experience-item {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.experience-header {
  margin-bottom: 10px;
}

.experience-details {
  list-style-type: none;
  padding: 0;
}

.competences-list, .languages-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.competences-list li, .languages-list li {
  margin-right: 20px;
}

/* Estilos opcionales para mejorar la presentación */
</style>
