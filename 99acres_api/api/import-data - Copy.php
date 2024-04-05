<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include "inc/config.php";

// $csv_file = $_FILES['fileCSV']['tmp_name'];
// $data = array_map('str_getcsv', file($csv_file));
// var_dump($data);
// echo $_POST['option'];
// die;


// if ($_FILES['fileCSV']['error'] == UPLOAD_ERR_OK && is_uploaded_file($_FILES['fileCSV']['tmp_name'])) {

//     $csv_file = $_FILES['fileCSV']['tmp_name'];
    $data = array_map('str_getcsv', file("work on this_gurgaon.csv"));
    // var_dump($data[1][6]);
    // if ($_POST['option'] == 'Buy') {
        $res1=$db->delete('inventory', 1,1);
        // $res1 = $db->delete('inventory', 'property_type', 'Resale');
        if (count($data) > 1) {
            for ($i = 1; $i < sizeof($data); $i++) {
                if ( isset ($data[$i][6] )){
                $tupleNew__locationName = isset($data[$i][6]) ? trim($data[$i][6]) : '';
                echo "<h1>". $i . "-" . $data[$i][6]."</h1>" ;
        
                $caption_strong_medium_semi = isset($data[$i][3]) ? trim($data[$i][3]) : '';
                $tupleNew__ribbon = isset($data[$i][7]) ? trim($data[$i][7]) : '';
                $tupleNew__propertyHeading_href = isset($data[$i][8]) ? trim($data[$i][8]) : '';
                $tupleNew__propType = isset($data[$i][9]) ? trim($data[$i][9]) : '';
                $tupleNew__propType = str_replace(", Gurgaon", "", $tupleNew__propType);
                $tupleNew__propType = str_replace("in", "", $tupleNew__propType);
                $tupleNew__bOld = isset($data[$i][10]) ? trim($data[$i][10]) : '';
                $tupleNew__priceValWrap = isset($data[$i][11]) ? trim($data[$i][11]) : '';
                $tupleNew__perSqftWrap = isset($data[$i][12]) ? trim($data[$i][12]) : '';
                $tupleNew__area1Type = isset($data[$i][13]) ? trim($data[$i][13]) : '';
                $tupleNew__areaType = isset($data[$i][16]) ? trim($data[$i][16]) : '';
                $tupleNew__area2Type_2 = isset($data[$i][18]) ? trim($data[$i][18]) : '';
                $tupleNew__possessionBy = isset($data[$i][19]) ? trim($data[$i][19]) : '';
                $tupleNew__unitHighlightTxt = isset($data[$i][21]) ? trim($data[$i][21]) : '';
                $descPtag_undefined = isset($data[$i][24]) ? trim($data[$i][24]) : '';
                $tupleNew__pbL2 = isset($data[$i][25]) ? trim($data[$i][25]) : '';
                $tupleNew__pbL0 = isset($data[$i][35]) ? trim($data[$i][35]) : '';
                $tupleNew__fdBadge = isset($data[$i][36]) ? trim($data[$i][36]) : '';

                $csvData = array(
                    'title' => $tupleNew__locationName,
                    'property_type' => ucfirst(strtolower($tupleNew__ribbon)),
                    'link' => $tupleNew__propertyHeading_href,
                    'location' => $tupleNew__propType,
                    'flat_type' => $tupleNew__bOld,
                    'price' => $tupleNew__priceValWrap,
                    'price_sqft' => $tupleNew__perSqftWrap,
                    'total_area' => $tupleNew__area1Type,
                    'area_type' => $tupleNew__areaType,
                    'bathroom' => $tupleNew__area2Type_2,
                    'description' => $descPtag_undefined,
                    'possession_by' => $tupleNew__possessionBy,
                    'plot_facing' => $tupleNew__unitHighlightTxt,
                    'viewed' => $caption_strong_medium_semi,
                    'posted_time' => $tupleNew__pbL0,
                    'posted_by' => $tupleNew__pbL2,
                    'dealer_type' => $tupleNew__fdBadge,
                );
                // if ($tupleNew__locationName != ""   ) {
                    $res = $db->insert('inventory', $csvData, '');
                // }
            }
    } /// For Loop END

            // if ($res) {
            //     echo json_encode(["success" => "Data Imported Successfully", "code" => 200]);
            //     exit;
            // } else {
            //     echo json_encode(["error" => "Error uploading file! Or No More Unique Data Found..!"]);
            //     exit;
            // }
        } else {
            // echo json_encode(["error" => "Your given file is blank, Please Upload file With Data."]);
            // exit;
        }
    // } else {
    //     //$res1=$db->delete('inventory', 'property_type','');
    //     // $res1 = $db->delete('inventory', 'property_type', 'Rent');
    //     // if (count($data) > 1) {
    //     //     for ($i = 1; $i < sizeof($data); $i++) {
    //     //         $tupleNew__locationName = isset($data[$i][11]) ? trim($data[$i][11]) : '';
    //     //         $tupleNew__locationName = str_replace(" Ultra Luxury Builder Floors", "", $tupleNew__locationName);
    //     //         $caption_strong_medium_semi = isset($data[$i][7]) ? trim($data[$i][7]) : '';
    //     //         $tupleNew__ribbon = "Rent"; //not available in rent excell
    //     //         $tupleNew__propertyHeading_href = isset($data[$i][12]) ? trim($data[$i][12]) : '';
    //     //         $tupleNew__propType = isset($data[$i][13]) ? trim($data[$i][13]) : '';
    //     //         $tupleNew__propType = str_replace(", Gurgaon", "", $tupleNew__propType);
    //     //         $tupleNew__propType = str_replace("in", "", $tupleNew__propType);
    //     //         $tupleNew__bOld = isset($data[$i][14]) ? trim($data[$i][14]) : '';
    //     //         $tupleNew__priceValWrap = isset($data[$i][15]) ? trim($data[$i][15]) : '';
    //     //         $tupleNew__perSqftWrap = "N/A"; //not available in rent excell
    //     //         $tupleNew__area1Type = isset($data[$i][18]) ? trim($data[$i][18]) : '';
    //     //         $tupleNew__areaType = isset($data[$i][21]) ? trim($data[$i][21]) : '';
    //     //         $tupleNew__area2Type_2 = isset($data[$i][23]) ? trim($data[$i][23]) : '';
    //     //         $tupleNew__possessionBy = "N/A"; //not available in rent excell
    //     //         $tupleNew__unitHighlightTxt = isset($data[$i][25]) ? trim($data[$i][25]) : '';
    //     //         $descPtag_undefined = isset($data[$i][28]) ? trim($data[$i][28]) : '';
    //     //         // Check if the description ends with a double quote and remove it if present
    //     //         if (substr($descPtag_undefined, -1) === '"') {
    //     //             $descPtag_undefined = rtrim($descPtag_undefined, '"');
    //     //         }
    //     //         $tupleNew__pbL2 = isset($data[$i][31]) ? trim($data[$i][31]) : '';
    //     //         $tupleNew__pbL0 = isset($data[$i][29]) ? trim($data[$i][29]) : '';
    //     //         $tupleNew__fdBadge = isset($data[$i][30]) ? trim($data[$i][30]) : '';
    //     //         $flateType = isset($data[$i][14]) ? trim($data[$i][14]) : '';
    //     //         if (str_contains($flateType, 'rent')) {
    //     //             $flateType = "Rent";
    //     //         } else {
    //     //             $flateType = "Resale";
    //     //         }

    //     //         $csvData = array(
    //     //             'title' => $tupleNew__locationName,
    //     //             'property_type' => $tupleNew__ribbon,
    //     //             'link' => $tupleNew__propertyHeading_href,
    //     //             'location' => $tupleNew__propType,
    //     //             'flat_type' => $tupleNew__bOld,
    //     //             'price' => $tupleNew__priceValWrap,
    //     //             'price_sqft' => $tupleNew__perSqftWrap,
    //     //             'total_area' => $tupleNew__area1Type,
    //     //             'area_type' => $tupleNew__areaType,
    //     //             'bathroom' => $tupleNew__area2Type_2,
    //     //             'description' => $descPtag_undefined,
    //     //             'possession_by' => $tupleNew__possessionBy,
    //     //             'plot_facing' => $tupleNew__unitHighlightTxt,
    //     //             'viewed' => $caption_strong_medium_semi,
    //     //             'posted_time' => $tupleNew__pbL0,
    //     //             'posted_by' => $tupleNew__pbL2,
    //     //             'dealer_type' => $tupleNew__fdBadge,
    //     //         );
    //     //         if ($tupleNew__locationName != "" or $tupleNew__locationName != null) {
    //     //             $res = $db->insert('inventory', $csvData, '');
    //     //         }
    //     //     } /// For Loop END
    //     //     if ($res) {
    //     //         echo json_encode(["success" => "Data Imported Successfully", "code" => 200]);
    //     //         exit;
    //     //     } else {
    //     //         echo json_encode(["error" => "Error uploading file! Or No More Unique Data Found..!"]);
    //     //         exit;
    //     //     }
    //     // } else {
    //     //     echo json_encode(["error" => "Your given file is blank, Please Upload file With Data."]);
    //     //     exit;
    //     // }
    // }

// } else {
//     echo json_encode(["error" => "Error uploading file!"]);
//     exit;
// }