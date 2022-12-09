<?php
    require('database.php');

    $id = $_POST["id"];
    $title = $_POST["title"];
    $cantor = $_POST["cantor"];
    $compositor = $_POST["compositor"];
    $capa = $_POST["capa"];
    $genero = $_POST["genero"];

    try {
        $stmt = $conn->prepare("UPDATE musicas  SET titulo = :titulo, cantor = :cantor, compositor = :compositor, capa = :capa, genero = :genero WHERE id = :id;");

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':titulo', $title);
        $stmt->bindParam(':cantor', $cantor);
        $stmt->bindParam(':compositor', $compositor);
        $stmt->bindParam(':capa', $capa);
        $stmt->bindParam(':genero', $genero);

        $stmt->execute();
        // echo "Cadastro com sucesso!";
        $count = $stmt->rowCount();
        if($count == 1){
            $result["success"]["message"] = "Cadastrado com sucesso!"; //criamos o array para devolver o resultado do insert numa mensagem de sucesso.

        $result["data"]["id"] = $id; //criamos o array para devolver o resultado do insert com os dados inseridos.
        $result["data"]["title"] = $title;
        $result["data"]["cantor"] = $cantor;
        $result["data"]["compositor"] = $compositor;
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