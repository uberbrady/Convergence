// Copyright (c) 2011 Moxie Marlinspike <moxie@thoughtcrime.org>
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License as
// published by the Free Software Foundation; either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
// USA


/**
 * This class is responsible for the logic of initiating a tunnel
 * through an external proxy. Right now HTTP and SOCKS5 are supported.
 *
 **/


function ProxyConnector(proxyInfo) {
  this.type = proxyInfo.type;
  this.host = proxyInfo.host;
  this.port = proxyInfo.port;
}

ProxyConnector.prototype.makeConnection = function(destinationSocket, host, port) {
  if (this.type == "http") {
    var proxyConnector = new HttpProxyConnector();
    proxyConnector.makeConnection(destinationSocket, host, port);
  } else if (this.type == "socks") {
    var proxyConnector = new SOCKS5Connector();
    proxyConnector.makeConnection(destinationSocket, host, port);
  } else {
    throw "Unsupported proxy type: " + this.type;
  }

  return destinationSocket;
};