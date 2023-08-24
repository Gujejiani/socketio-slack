
const Namespace = require('../classes/Namespace')
const wikiNs = new Namespace(0, 'Wikipedia', 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png', '/wiki' )

const Room = require('../classes/Room')
const mozNs = new Namespace(1, 'Mozilla', 'https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png', '/mozilla' )

const linuxNs = new Namespace(2, 'Linux', 'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png', '/linux' )


wikiNs.addRoom(new Room(0, 'New Article', 0, true))
wikiNs.addRoom(new Room(1, 'New Editors', 0))
wikiNs.addRoom(new Room(2, 'New Other', 0))


mozNs.addRoom(new Room(0, 'FireFox', 1))
mozNs.addRoom(new Room(1, 'See Monkey', 1))
mozNs.addRoom(new Room(2, 'Spider Monkey', 1))
mozNs.addRoom(new Room(3, 'Rust', 1))

linuxNs.addRoom(new Room(0, 'Debian', 2))
linuxNs.addRoom(new Room(1, 'Red hat', 2))
linuxNs.addRoom(new Room(2, 'Cha Cha Cha', 2))
linuxNs.addRoom(new Room(3, 'Mac OS', 2))


const namespaces = [wikiNs, mozNs, linuxNs]


module.exports = namespaces