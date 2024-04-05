<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include "inc/config.php";

// $csv_file = $_FILES['fileCSV']['tmp_name'];
// $data = array_map('str_getcsv', file($csv_file));
// var_dump($data);
// die;


if ($_FILES['fileCSV']['error'] == UPLOAD_ERR_OK && is_uploaded_file($_FILES['fileCSV']['tmp_name'])) {
    $res=$db->delete('listing', 1,1);
    $csv_file = $_FILES['fileCSV']['tmp_name'];
    $data = array_map('str_getcsv', file($csv_file));
            if (count($data) > 1) { 
            for ($i=1; $i < sizeof($data); $i++) {

                $component__cGrey = isset($data[$i][0])?trim($data[$i][0]):'';
                $component__rubyTag = isset($data[$i][1])? trim($data[$i][1]):'';
                $component__blueLink = isset($data[$i][3])? trim($data[$i][3]):'';
                $component__icon_href = isset($data[$i][2])? trim($data[$i][2]):'';
                $CompletionChart__percentage = isset($data[$i][12])?trim($data[$i][12]):'';
                $hyperlinks_small = isset($data[$i][13])? trim($data[$i][13]):'';
                $component__light_text_10 = isset($data[$i][16])? trim($data[$i][16]):'';
                $component__percentile = isset($data[$i][18])? trim($data[$i][18]):'';
                $component__main_text = isset($data[$i][5])?trim($data[$i][5]):'';
                $component__light_text_2 = isset($data[$i][6])? trim($data[$i][6]):'';
                $component__main_text_2 = isset($data[$i][7])?trim($data[$i][7]):'';
                $component__sub_wrap = isset($data[$i][8])? trim($data[$i][8]):'';
                $component__main_text_3 = isset($data[$i][9])? trim($data[$i][9]):'';
                $component__main_text_4 = isset($data[$i][10])?trim($data[$i][10]):'';

                $csvData=array(
                    'Title' => $component__cGrey,
                    'Is_Premium' => $component__rubyTag, 
                    'AssignedTo' => $component__blueLink,
                    'Link' => $component__icon_href, 
                    'Score' => $CompletionChart__percentage,
                    'MissingData' => $hyperlinks_small,
                    'Credit' => $component__light_text_10, 
                    'LocalityPercentage' => $component__percentile,
                    'Price' => $component__main_text, 
                    'AreaType' => $component__light_text_2, 
                    'TotalArea' => $component__main_text_2,
                    'ListingID' => $component__sub_wrap,
                    'ListedDate' => null, 
                    'ExpiryDate' => null,
                    'CreatedByID' => 0,
                    'ModifyByID' => 0,
                    'RemarkID' => 0,
                    'PropertyCategory' => '',
                    'AreaUnit' => '',
                    'PropertyType' => '',
                    'ConvertedPrice' => 0,
                );
                    // print_r($csvData);
                    // exit();
                // if ($tupleNew__locationName != "" or $tupleNew__locationName != null) {
                $res=$db->insert('listing', $csvData,'ignore');
                // }
            } /// For Loop END
        
            if($res) {
            echo json_encode(["success" => "Data Imported Successfully", "code"=>200]);
            exit;
            }else{
            echo json_encode(["error" => "Error uploading file! Or No More Unique Data Found..!"]);
            exit;
            }
        }else{
            echo json_encode(["error" => "Your given file is blank, Please Upload file With Data."]);
            exit;
        }
}