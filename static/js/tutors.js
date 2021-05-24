const placeHolder = document.getElementById("tutors");

// const employed = document.getElementById("employed-list");
// const pendingS = document.getElementById("pending-s-list");

document.addEventListener("DOMContentLoaded", () => {

    fetch_data().then(data => {
        display_tutors(data);
    })

});

async function fetch_data() {
    const response = await fetch('/tutorsData'); //fetch data
    const json = await response.json(); //parse the returned data into json

    return json.body;
}

function display_tutors(data) {
    const tutors_arr = data;
    for (let i = 0; i < tutors_arr.length; i++) {
        tutorName = tutors_arr[i]['name']
        bio = tutors_arr[i]['bio']
        rating = tutors_arr[i]['rating']
        profileImage = tutors_arr[i]['profile_image']

        let card = document.createElement('div');
        card.className = 'col-md-4';
        let carr = []
        let ncarr = []
        for (let r = 0; r < rating; r++) {
            const element = `<span class='ratingCount' my-0 py-0 large'>★</span>`;
            carr.push(element)
        }
        for (let r = 0; r < (5 - rating); r++) {
            const element = `<span class='ratingCountGrey my-0 py-0 large'>★</span>`;
            ncarr.push(element)
        }
        card.innerHTML = `<div class="text-center card-box">
        <div class="member-card pt-2 pb-2">
            <div class="thumb-lg member-thumb mx-auto"><img
                    src="https://bootdey.com/img/Content/avatar/avatar4.png"
                    class="rounded-circle img-thumbnail" alt="profile-image"></div>
            <div class="">
                <h4>${tutorName}</h4>
                <p class="text-muted">${bio}</p>
            </div>
            <div>
                <div>
                    ${carr.join("")}${ncarr.join("")}
                    <span class=''>(${rating})</span>
                </div>
            </div>
            <button type="button"
                class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light">Get
                Tutor</button>
            <div class="mt-4">
                <p>

                    <a class="" data-bs-toggle="collapse" href="#collapseExample${i}" role="button"
                        aria-expanded="false" aria-controls="collapseExample${i}">
                        Comments 🔽
                    </a>

                </p>
                <div class="collapse" id="collapseExample${i}">
                    <div class="card card-body">
                        Some placeholder content for the collapse component. This panel is hidden by
                        default but revealed when the user activates the relevant trigger.
                    </div>
                </div>
            </div>
        </div>
        </div>`

        placeHolder.appendChild(card);
    }
}