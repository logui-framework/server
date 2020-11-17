// JS for the firstrun page.

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#test-dommanipulation-button').addEventListener('click', function() {
        if (this.innerHTML.includes('add')) {
            var element1 = document.createElement('div');
            element1.appendChild(document.createTextNode('No binding'))
            element1.id = 'test-dommanipulation-box1';
            element1.classList.add('test');
    
            var element2 = document.createElement('div');
            element2.appendChild(document.createTextNode('Hover and click binding'))
            element2.id = 'test-dommanipulation-box2';
            element2.classList.add('test');
    
            LogUITestEnvDriver.$('#test-dommanipulation-newcontainer').appendChild(element1);
            LogUITestEnvDriver.$('#test-dommanipulation-newcontainer').appendChild(element2);
            
            this.innerHTML = 'Click to destroy elements';

            return;
        }

        this.innerHTML = 'Click to add two new elements';
        LogUITestEnvDriver.$('#test-dommanipulation-newcontainer').innerHTML = '';
    });
});