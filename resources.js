// Sets up resource definitions
function defineResources() {
    if (global.race.species === 'protoplasm'){
        loadResource('RNA',100,0);
        loadResource('DNA',100,0);
    }
    else {
        loadResource('Money',1000,1,'success');
        loadResource(races[global.race.species].name,0,0);
        loadResource('Knowledge',100,0);
        loadResource('Food',250,1);
        loadResource('Lumber',250,1);
        loadResource('Stone',250,1);
    }
}
// Sets up jobs in civics tab
function defineJobs(){
    loadJob('farmer');
}

// Load resource function
// This function defines each resource, loads saved values from localStorage
// And it creates Vue binds for various resource values
function loadResource(name,max,value,color) {
    color = color || 'info';
    if (!global['resource'][name]){
        global['resource'][name] = {
            name: name === 'Money' ? '$' : name,
            display: false,
            value: value,
            amount: 0,
            last: 0,
            diff: 0,
            max: max
        };
    }
    
    if (global['resource'][name]['max'] > 0){
        var res_container = $('<div id="res-' + name + '" class="resource" v-show="display"><span class="res has-text-' + color + '">{{ name }}</span><span class="count">{{ amount }} / {{ max }}</span><span class="diff">({{ diff }} /s)</span></div>');
        $('#resources').append(res_container);
    }
    else {
        var res_container = $('<div id="res-' + name + '" class="resource" v-show="display"><span class="res has-text-' + color + '">{{ name }}</span><span class="count">{{ amount }}</span><span class="diff">({{ diff }} /s)</span></div>');
        $('#resources').append(res_container);
    }
    
    vues['res_'+name] = new Vue({
        data: global['resource'][name]
    });
    vues['res_'+name].$mount('#res-' + name);
}

function loadJob(job){
    if (!global['civic'][job]){
        global['civic'][job] = {
            job: job,
            display: false,
            workers: 0,
            max: 0
        };
    }
}
