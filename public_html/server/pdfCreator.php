<?php

header('Content-Type: text/html; charset=UTF-8');
require '../admin/libs/fpdf17/fpdf.php';

class PDF extends FPDF {

    var $B;
    var $I;
    var $U;
    var $HREF;

    function PDF($orientation = 'P', $unit = 'mm', $size = 'A4') {
        // Llama al constructor de la clase padre
        $this->FPDF($orientation, $unit, $size);
        // Iniciaci�n de variables
        $this->B = 0;
        $this->I = 0;
        $this->U = 0;
        $this->HREF = '';
    }

// Cargar los datos
    function LoadData($file) {
        $lines = file($file);
        $data = array();
        foreach ($lines as $line)
            $data[] = explode(';', trim($line));
        return $data;
    }

// Tabla coloreada
    function FancyTable($header, $data) {
        // Colores, ancho de l�nea y fuente en negrita
        $this->SetFillColor(126, 209, 226);
        $this->SetTextColor(80, 80, 80);
        $this->SetDrawColor(80, 80, 80);
        $this->SetLineWidth(.3);
        $this->SetFont('', 'B');
        $tam = 37.8;
        // Cabecera
        for ($i = 0; $i < count($header); $i++)
            $this->Cell($tam, 7, $header[$i], 1, 0, 'C', true);
        $this->Ln();
        // Restauraci�n de colores y fuentes
        $this->SetFillColor(224, 235, 255);
        $this->SetTextColor(0);
        $this->SetFont('');
        // Datos
        $fill = false;
        $tot = 0;
        foreach ($data as $row) {
            $this->Cell($tam, 6, number_format($row[1]), 'LR', 0, 'C', $fill);
            $this->Cell($tam, 6, utf8_decode($row[2]), 'LR', 0, 'C', $fill);
            $this->Cell($tam, 6, number_format($row[3]), 'LR', 0, 'C', $fill);
            $this->Cell($tam, 6, number_format($row[4]), 'LR', 0, 'C', $fill);
            $this->Cell($tam, 6, number_format($row[4] * $row[3]), 'LR', 0, 'C', $fill);
            $tot += number_format($row[4] * $row[3]);
            $this->Ln();
            $fill = !$fill;
        }
        $this->SetFillColor(126, 209, 226);
        $this->Cell(($tam * 4), 6, 'TOTAL', 1, 0, 'C', true);
        $this->Cell($tam, 6, $tot, 1, 0, 'C', true);
        // L�nea de cierre
//	$this->Cell(($tam * 5),0,'','T');
    }

    function PutLink($URL, $txt) {
        // Escribir un hiper-enlace
        $this->SetTextColor(0, 0, 255);
        $this->SetStyle('U', true);
        $this->Write(5, $txt, $URL);
        $this->SetStyle('U', false);
        $this->SetTextColor(0);
    }

    function CloseTag($tag) {
        // Etiqueta de cierre
        if ($tag == 'B' || $tag == 'I' || $tag == 'U')
            $this->SetStyle($tag, false);
        if ($tag == 'A')
            $this->HREF = '';
    }

    function SetStyle($tag, $enable) {
        // Modificar estilo y escoger la fuente correspondiente
        $this->$tag += ($enable ? 1 : -1);
        $style = '';
        foreach (array('B', 'I', 'U') as $s) {
            if ($this->$s > 0)
                $style .= $s;
        }
        $this->SetFont('', $style);
    }

    function OpenTag($tag, $attr) {
        // Etiqueta de apertura
        if ($tag == 'B' || $tag == 'I' || $tag == 'U')
            $this->SetStyle($tag, true);
        if ($tag == 'A')
            $this->HREF = $attr['HREF'];
        if ($tag == 'BR')
            $this->Ln(5);
    }

    function WriteHTML($html) {
        // Int�rprete de HTML
        $html = str_replace("\n", ' ', $html);
        $a = preg_split('/<(.*)>/U', $html, -1, PREG_SPLIT_DELIM_CAPTURE);
        foreach ($a as $i => $e) {
            if ($i % 2 == 0) {
                // Text
                if ($this->HREF)
                    $this->PutLink($this->HREF, $e);
                else
                    $this->Write(5, $e);
            }
            else {
                // Etiqueta
                if ($e[0] == '/')
                    $this->CloseTag(strtoupper(substr($e, 1)));
                else {
                    // Extraer atributos
                    $a2 = explode(' ', $e);
                    $tag = strtoupper(array_shift($a2));
                    $attr = array();
                    foreach ($a2 as $v) {
                        if (preg_match('/([^=]*)=["\']?([^"\']*)/', $v, $a3))
                            $attr[strtoupper($a3[1])] = $a3[2];
                    }
                    $this->OpenTag($tag, $attr);
                }
            }
        }
    }

    function Header() {
        // Logo
        $this->Image('../admin/img/logo2.png', 50, 8, 28);
        // Arial bold 15
        $this->SetFont('Arial', 'B', 15);
        // Movernos a la derecha
        $this->Cell(80);
        // T�tulo
        $this->Cell(30, 10, 'Metroid Games', 0, 2, 'C');

        $this->SetFont('Arial', 'B', 10);

        $this->Cell(30, 10, 'C/Inventada 12, 1', 0, 0, 'C');
        // Salto de l�nea
        $this->Ln(20);
    }

// Pie de p�gina
    function Footer() {
        // Posici�n: a 1,5 cm del final
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('Arial', 'I', 8);
        // N�mero de p�gina
        $this->Cell(0, 10, 'Page ' . $this->PageNo() . '/{nb}', 0, 0, 'C');
    }
}

require 'controller/pedidoController.php';

//$pedidoDAO = new PedidoDAO();
//
//echo json_encode($pedidoDAO->selectJoin('producto', 'id_producto', 'id', 'linea_pedido.id_pedido = ' + $_GET['idPedido']));

//echo 'Datos: ' . $_POST['datos'] . '<br/>';
//echo ($_POST['datos']);

/*$datos = $_POST['datos'];
$obj = new stdClass();
$obj = json_decode($datos);
print_r($obj);*/
/*var_dump(json_decode("[{'id':'1','val':'1'},{'id':'2','val':'2'}]"));
var_dump(json_decode("{'id':'1','val':'1'}",JSON_FORCE_OBJECT));
var_dump(json_decode("[1,2,3]"));*/
//$datos = $_POST['datos'];
//echo $datos;

$pdf = new PDF();
// T�tulos de las columnas
$header = array(utf8_decode('Producto'), utf8_decode('Descripción'), utf8_decode('Cantidad'), utf8_decode('Prec. por Uni.'),
    utf8_decode('Prec. Tot.'));
//$pdf->WriteHTML($html);
// Carga de datos
$data = $pdf->LoadData('../admin/libs/fpdf17/paises.txt');
$fecha = date("d/m/Y");
$pedido;
foreach ($data as $row) {
            $pedido = $row[0];
        }
$pdf->AliasNbPages();
$pdf->SetFont('Arial', '', 14);
$pdf->AddPage();
$pdf->SetFontSize(14);
$pdf->Cell(105, 10, utf8_decode('Detalles del pedido Nº ' . $pedido . ':'), 0, 0, 'I');
$pdf->Cell(105, 10, utf8_decode('Fecha de emisión:' . $fecha), 0, 0, 'C');
$pdf->Ln(20);


$pdf->FancyTable($header, $data);
$pdf->Output();

