<?php
    require('database-artistas.php');

    $id = $_POST["id"];
    $artista = $_POST["artista"];
    $musicas = $_POST["musicas"];
    $singles = $_POST["singles"];
    $capa = $_POST["capa"];
    $genero = $_POST["genero"];

    try {
        $stmt = $conn->prepare("UPDATE artistas  SET artista = :artista, musicas = :musicas, singles = :singles, capa = :capa, genero = :genero WHERE id = :id;");

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':artista', $artista);
        $stmt->bindParam(':musicas', $musicas);
        $stmt->bindParam(':singles', $singles);
        $stmt->bindParam(':capa', $capa);
        $stmt->bindParam(':genero', $genero);

        $stmt->execute();
        // echo "Cadastro com sucesso!";
        $count = $stmt->rowCount();
        if($count == 1){
            $result["success"]["message"] = "Cadastrado com sucesso!"; //criamos o array para devolver o resultado do insert numa mensagem de sucesso.

        $result["data"]["id"] = $id; //criamos o array para devolver o resultado do insert com os dados inseridos.
        $result["data"]["artista"] = $artista;
        $result["data"]["musicas"] = $musicas;
        $result["data"]["singles"] = $singles;
        $result["data"]["capa"] = $capa;
        $result["data"]["genero"] = $genero;
        }else{
            $result["error"]["message"] = "ID: $id não encontrado!";
        }

        header('Content-Type: text/json');
        echo json_encode($result);
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
?>