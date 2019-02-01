const outEl = document.querySelector("#output");

const createBusinessList = businessArray => {
    outEl.innerHTML = "<h1>Active Businesses</h1>";

    businessArray.forEach(business => {
        const zipcode = business.addressZipCode;

        let totalOrders = business.orders.reduce(
            (currentTotal, nextValue) => currentTotal += nextValue,
            0
        )
        outEl.innerHTML += `
        <h2>${business.companyName} (${Intl.NumberFormat("US-en", { style: "currency", currency: "USD" }).format(totalOrders)})</h2>
        <section>
        ${business.addressFullStreet}
        </section>
        <section>
        ${business.addressCity} ${business["addressStateCode"]} ${zipcode}
        </section>
        `;
        outEl.innerHTML += "<hr/>";
    });
};

// createBusinessList(businesses);

// Array to contain all the New York businesses
const newYorkBusinesses = businesses.filter(business => {
    let inNewYork = false;
    if (business.addressStateCode === "NY") {
        inNewYork = true;
    }
    return inNewYork;
});

// createBusinessList(newYorkBusinesses);

// Use filter() to create another array named manufacturingBusinesses that will contain all businesses in the manufacturing industry. Display those to the DOM.

const manufacturingBusinesses = businesses.filter(business => {
    let manufacturer = false;
    if(business.companyIndustry === "Manufacturing") {
        manufacturer = true;
    }
    return manufacturer;
});

// createBusinessList(manufacturingBusinesses);

const bigSpenders = businesses.filter(business => {
    let spender = false;
    business.orders.forEach(element => {
        if (element > 9000) {
            spender = true;
        }
    });
    return spender;
});

createBusinessList(bigSpenders);

// outEl.innerHTML += "<h1>Purchasing Agents</h1>";

// /*
// Using map(), you extract the purchasing agent object
// from each business and store it in a new array
// */
// const agents = businesses.map(business => {
//     return business.purchasingAgent;
// });

// console.table(agents);

// agents.forEach(agent => {
//     outEl.innerHTML += `<h2>${agent.nameFirst} ${agent.nameLast}</h2>`;
//     outEl.innerHTML += "<hr/>";
// });

// Instead of just returning the purchasing agent object, return a new object that has the full name of the purchasing agent, the company name, and the phone number. The data structure is shown below. Use that new data structure to display the agent with their company and phone number

// {
//     "fullName": "Kaylee Gutkowski",
//     "company": "Highnix",
//     "phoneNumber": "235.266.6278"
// }

// const agentsData = businesses.map(
//     business => {
//         let agentObject = {};
//         agentObject.fullName = `${business.purchasingAgent.nameFirst} ${business.purchasingAgent.nameLast}`;
//         agentObject.company = business.companyName;
//         agentObject.phoneNumber = business.phoneWork;
//         return agentObject;
//     });

// console.log(agentsData);

// agentsData.forEach(agent => {
//     outEl.innerHTML += `<h2>${agent.fullName}</h2>
//     ${agent.company}<br />${agent.phoneNumber}`;
//     outEl.innerHTML += "<hr/>";
// });


// document
// .querySelector("#companySearch")
// .addEventListener("keypress", keyPressEvent => {
//     if (keyPressEvent.charCode === 13) {
//         /* WHEN  USER PRESSES ENTER, FIND MATCHING BUSINESS */
//         const foundBusiness = businesses.find(
//             business =>
//             business.companyName.includes(keyPressEvent.target.value)
//             );

//             outEl.innerHTML = `
//             <h2>
//             ${foundBusiness.companyName}
//             </h2>
//             <section>
//             ${foundBusiness.addressFullStreet}

//             </section>
//             <section>
//             ${foundBusiness.addressCity},
//             ${foundBusiness.addressStateCode}
//             ${foundBusiness.addressZipCode}
//             </section>
//             `;
//         }
//     });

// Refactor your code to search for purchasing agents instead. If the search text is found in the first name of any purchasing agent, show that agent.

document
.querySelector("#companySearch")
.addEventListener("keypress", keyPressEvent => {
    if (keyPressEvent.charCode === 13) {
        /* WHEN  USER PRESSES ENTER, FIND MATCHING BUSINESS */
        const foundBusiness = businesses.find(
            business =>
            business.purchasingAgent.nameFirst.includes(keyPressEvent.target.value) || business.purchasingAgent.nameLast.includes(keyPressEvent.target.value)
            );

            outEl.innerHTML = `<h2>
            ${foundBusiness.purchasingAgent.nameFirst} ${foundBusiness.purchasingAgent.nameLast}
            </h2>`;
        }
    });