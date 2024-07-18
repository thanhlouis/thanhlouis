const randomOffset = range => Math.random() * range * 2 - range;
const randomPressure = () => Math.random() * 0.5 + 0.5;
function createEvent(type, target, options) {
    target.dispatchEvent(new PointerEvent(type, {
        bubbles: true, cancelable: true, view: window, detail: 1, pointerId: 1, width: 1, height: 1,
        tangentialPressure: 0, tiltX: 0, tiltY: 0, pointerType: 'pointer', isPrimary: true, ...options
    }));
}

function getCoords(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
    return { clientX: x, clientY: y, screenX: window.screenX + x, screenY: window.screenY + y };
}

function clickElement(target) {
    const { clientX, clientY, screenX, screenY } = getCoords(target);
    const options = { clientX: clientX + randomOffset(5), clientY: clientY + randomOffset(5), screenX: screenX + randomOffset(5), screenY: screenY + randomOffset(5), pressure: randomPressure() };
    ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(type => createEvent(type, target, options));
}

function clickElementWithXpath(xpath){
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const targetofxpath = result.singleNodeValue;
    clickElement(targetofxpath);
}

function clickElementNormal(dir){
    const diachi = document.querySelector(dir)
    clickElement(diachi)
}
