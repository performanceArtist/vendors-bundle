let loadSharedModulesBtn = document.getElementById('btn-shared-modules-loader');

loadSharedModulesBtn.addEventListener('click', async () => {
    let sharedFunctionModule = await import('remoteApp/mySharedFunction');
    let sharedFunctionModule2 = await import('remoteApp2/mySharedFunction');
    sharedFunctionModule.myFunction();

    let sharedButtonModule = await import('remoteApp/mySharedButton');
    let sharedButtonModule2 = await import('remoteApp2/mySharedButton');
    let sharedButton = document.createElement(sharedButtonModule.name);
    let sharedButtonContainer = document.getElementById('shared-btn-container');
    sharedButtonContainer.appendChild(sharedButton);
})