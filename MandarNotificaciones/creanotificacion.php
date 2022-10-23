<html>
<head>
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
<style>
  /* Extra small devices (phones, less than 768px) */
/* No media query since this is the default in Bootstrap */

/* Small devices (tablets, 768px and up) */
@media (min-width: 768px) { 
  .letragrande{
    font-size: 74px;
  }
  .buttongrande{
    height: 100px;
    font-size: 50px;
  }

  }

/* Medium devices (desktops, 992px and up) */
/*@media (min-width: 992) { ... }

/* Large devices (large desktops, 1200px and up) */
/*@media (min-width: 1200) { ... } */
</style>
</head>
<body>


  <div class="container">
    <form action="push.php" method="POST">
        <h5>Tipo: </h5>
        <select formControlName="body" class="form-select" name="body">
          <option>Vialidad</option>
          <option>Catastrófica</option>
          <option>Meteorológica</option>
          <option>Otro</option>
        </select>

        <br>

        <h5>Descripción: </h5>
        <div class="form-floating mb-3">
        <input type="text" name="title" class="form-control" placeholder="Tipo">
        <label for="floatingInput">Notificar</label>
        
        </div>
      <button class="w-100 btn btn-md btn-danger"  type="submit">¡Alertar!</button>
    </form>
  </div>



<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
</body>
</html>