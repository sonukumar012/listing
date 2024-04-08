<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<script>
$(document).ready(function() {
    fnListShowCustomerDetails();              
});
</script>


<script>
function fnListShowCustomerDetails() {

    $.ajax({
        type: "POST",
        dataType: "json",
        success: SuccessHandler,
        url: 'api/apicommon.php',
        data: {
            action: "listShowCustomerDetails"
        }
    });

    function SuccessHandler(data) {
        console.log(data);
    };
}

</script>