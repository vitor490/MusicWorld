<?php
    require ('database.php'); 
    //Require() : a função require() importa arquivos, porém, caso o mesmo não seja encontrado, será levantado uma exceção e a execução é finalizada. Essa é uma maneira de interrompermos a execução dos scripts caso alguma anomalia ocorra.

    $title = $_POST["title"]; //name do input
    $cantor = $_POST["cantor"];
    $compositor = $_POST["compositor"];
    $capa = $_POST["capa"];
    $genero = $_POST["genero"];

    // echo $title. "<br>";
    // echo $cantor. "<br>";
    // echo $compositor. "<br>"; //só para exibir os dados na tela
    // echo $capa. "<br>";
    // echo $genero. "<br>";

    try {
        $stmt = $conn->prepare("INSERT INTO musicas (titulo, cantor, compositor, capa, genero)
        VALUES (:titulo, :cantor, :compositor, :capa, :genero)");
        $stmt->bindParam(':titulo', $title);
        $stmt->bindParam(':cantor', $cantor);
        $stmt->bindParam(':compositor', $compositor);
        $stmt->bindParam(':capa', $capa);
        $stmt->bindParam(':genero', $genero);

        $stmt->execute();
        // echo "Cadastro com sucesso!";
        $id = $conn->lastInsertId();

        $result["success"]["message"] = "Música cadastrada com sucesso!"; //criamos o array para devolver o resultado do insert numa mensagem de sucesso.

        $result["data"]["id"] = $id; //criamos o array para devolver o resultado do insert com os dados inseridos.
        $result["data"]["title"] = $title;
        $result["data"]["cantor"] = $cantor;
        $result["data"]["compositor"] = $compositor;
        $result["data"]["capa"] = $capa;
        $result["data"]["genero"] = $genero;

        header('Content-Type: Text/json'); //para ser enviado no formato json.
        echo json_encode($result); //exibir o resultado.

    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
?>