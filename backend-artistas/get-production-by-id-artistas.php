<?php

    require('database-artistas.php');

    try {
        $id = '';
        if (isset($_GET['id'])){
            $id = $_GET['id'];
        }

        $stmt = $conn->prepare("SELECT * FROM artistas WHERE id = :id;");
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $count = $stmt->rowCount();

        if ($count == 1) {
            $producao = $stmt->fetch(PDO::FETCH_ASSOC);
            $result["success"]["message"] = "Artistas encontrada com sucesso!";
            $result["data"] = $producao;
        } else {
            $result["error"]["message"] = "ID: $id não encontrado!";
        }

        header('Content-Type: text/json');
        echo json_encode($result);

    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

?>