let freeImage = 'images/room_free.png';
let blockedImage = 'images/room_blocked.png';

let timeToRefresh = 60;

$(window).on("load", function() {
    setInterval(() => {
        timeToRefresh--;
        if(timeToRefresh == 0) {
            window.location.reload(true);
        }

        document.getElementById("refreshCountdown").innerHTML = timeToRefresh.toString();
    }, 1000);

    $.ajax({
        type: "GET",
        url: "rooms.csv",
        dataType: "text",
        success: function(csv) {
            var data = $.csv.toObjects(csv);
            
            // Render Room Map
            console.log(data);

            for(let room of data) {
                console.log(room.room_status);
                try {
                    if(room.room_status === 'free') {
                        document.getElementById(room.room_name).setAttribute("src", freeImage);
                    } else {
                        document.getElementById(room.room_name).setAttribute("src", blockedImage);
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
        }
     });
});