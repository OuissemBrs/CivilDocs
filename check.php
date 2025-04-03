<?php
// Allow requests from the frontend
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

// Read the input data
$data = $_POST; // Using $_POST instead of json_decode since you're sending data as x-www-form-urlencoded

// Validate input
if (!$data) {
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

$NId = $data['NId'] ?? null;
$ID = $data['ID'] ?? null;
$CertID = $data['CertID'] ?? null;
$FName = $data['FName'] ?? null;
$LName = $data['LName'] ?? null;
$State = $data['State'] ?? null;
$Date = $data['Date'] ?? null;
$Ctype = $data["Ctype"] ?? null;

if (!$NId || !$ID || !$CertID || !$FName || !$LName || !$State || !$Date) {
    echo json_encode(["error" => "All fields are required"]);
    exit;
}

try {
    $servername = "localhost";
    $username = "root";
    $password = "Wass11dz$$23";
    $dbname = "state";

    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    switch ($Ctype) {
        case "BC":
            $query = "SELECT * FROM person WHERE FirstName = :FName AND LastName = :LName AND BirthPlace = :State AND CertificateNBR = :CertID  AND BirthYear = :Date AND NationalIDnbr = :NId AND ( IDnbr = :ID OR Passportnbr = :ID OR DriverIDnbr = :ID ) ";
            break;
        case "MC":
            $query = "SELECT 
    p.FirstName AS HFName,
    p.LastName AS HLName,
    p.IDnbr AS HIDnbr,
    p.Passportnbr AS HPnbr,
    p.DriverIDnbr AS HDnbr,
    p.NationalIDnbr AS HNIDnbr,
    m.MarriageCertificatenbr AS MID,
    m.MarriageDate AS Mdate,
    m.MarriageState AS Mstate
FROM person AS p
JOIN marriage AS m ON p.NationalIDnbr = m.HusbandID
WHERE 
    (p.FirstName = :FName AND p.LastName = :LName AND p.NationalIDnbr = :NId)
    AND (m.MarriageDate = :Date AND m.MarriageCertificatenbr = :CertID AND m.MarriageState = :State)
   AND (p.Passportnbr = :ID OR p.IDnbr = :ID OR p.DriverIDnbr = :ID)

UNION ALL

SELECT 
    p.FirstName AS WFName,
    p.LastName AS WLName,
    p.IDnbr AS WIDnbr,
    p.Passportnbr AS WPnbr,
    p.DriverIDnbr AS WDnbr,
    p.NationalIDnbr AS WNIDnbr,
    m.MarriageCertificatenbr AS MID,
    m.MarriageDate AS Mdate,
    m.MarriageState AS Mstate
FROM person AS p
JOIN marriage AS m ON p.NationalIDnbr = m.WifeID
WHERE (m.MarriageDate = :Date AND m.MarriageCertificatenbr = :CertID AND m.MarriageState = :State)
    AND (p.Passportnbr = :ID OR p.IDnbr = :ID OR p.DriverIDnbr = :ID);
";
            break;
        case "DC":
            $query = "SELECT * 
    FROM person AS p
    JOIN death AS d 
    ON p.NationalIDnbr = d.ID
    WHERE FirstName = :FName
      AND LastName = :LName
      AND DeathDate = :Date
      AND DeathState = :State
      AND CertficateNbr = :CertID
";
            break;
    }

    $stmt = $conn->prepare($query);
    if ($Ctype == "DC") {
        $stmt->bindParam(':FName', $FName);
        $stmt->bindParam(':LName', $LName);
        $stmt->bindParam(':State', $State);
        $stmt->bindParam(':CertID', $CertID);
        $stmt->bindParam(':Date', $Date);
    } else {
        $stmt->bindParam(':NId', $NId);
        $stmt->bindParam(':ID', $ID);
        $stmt->bindParam(':CertID', $CertID);
        $stmt->bindParam(':FName', $FName);
        $stmt->bindParam(':LName', $LName);
        $stmt->bindParam(':State', $State);
        $stmt->bindParam(':Date', $Date);
    }


    $stmt->execute();
    if ($Ctype == "DC") {
        if ($stmt->rowCount() > 0) {
            $query = "SELECT * FROM person WHERE NationalIDnbr = :NId AND ( IDnbr = :ID OR Passportnbr = :ID OR DriverIDnbr = :ID ) ";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':NId', $NId);
            $stmt->bindParam(':ID', $ID);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                echo "true";
            } else {
                echo "false";
            }
        } else {
            echo "tt";
            echo "false";
        }
    } else {
        if ($stmt->rowCount() > 0) {
            echo "true";
        } else {
            echo "false";
        }
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
