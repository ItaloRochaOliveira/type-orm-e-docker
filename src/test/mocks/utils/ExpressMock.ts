import * as sinon from 'sinon';
import { Response, Request } from 'express';
import { Socket } from 'net';
import { EventEmitter, Readable } from 'stream';

class ResponseMock implements Response{
    clearCookie: sinon.SinonStub;
    download:sinon.SinonStub;
    contentType:sinon.SinonStub;
    type:sinon.SinonStub;
    format:sinon.SinonStub
    attachment:sinon.SinonStub;
    set: sinon.SinonStub;
    header:sinon.SinonStub;
    headersSent: boolean;
    get:sinon.SinonStub;
    cookie: sinon.SinonStub;
    location:sinon.SinonStub;
    redirect:sinon.SinonStub;
    render:sinon.SinonStub;
    locals:any;
    charset: string;
    vary:sinon.SinonStub;
    app:any;
    append:sinon.SinonStub;
    req: any;
    statusCode: number;
    statusMessage: string;
    strictContentLength: boolean;
    assignSocket:sinon.SinonStub;
    detachSocket:sinon.SinonStub;
    writeContinue:sinon.SinonStub;
    writeEarlyHints:sinon.SinonStub;
    writeHead:sinon.SinonStub;
    writeProcessing:sinon.SinonStub
    chunkedEncoding: boolean;
    shouldKeepAlive: boolean;
    useChunkedEncodingByDefault: boolean;
    sendDate: boolean;
    finished: boolean;
    connection: Socket | null;
    socket: Socket | null;
    setTimeout: sinon.SinonStub;
    setHeader: sinon.SinonStub;
    appendHeader: sinon.SinonStub;
    getHeader : sinon.SinonStub;
    getHeaders : sinon.SinonStub;
    getHeaderNames : sinon.SinonStub;
    hasHeader : sinon.SinonStub;
    removeHeader : sinon.SinonStub;
    addTrailers : sinon.SinonStub;
    flushHeaders : sinon.SinonStub;
    writable: boolean;
    writableEnded: boolean;
    writableFinished: boolean;
    writableHighWaterMark: number;
    writableLength: number;
    writableObjectMode: boolean;
    writableCorked: number;
    destroyed: boolean;
    closed: boolean;
    errored: Error | null;
    writableNeedDrain: boolean;
    _write: sinon.SinonStub;
    _writev?: sinon.SinonStub;
    _construct?: sinon.SinonStub;
    _destroy: sinon.SinonStub;
    _final: sinon.SinonStub;
    write: sinon.SinonStub;
    setDefaultEncoding: sinon.SinonStub;
    end: sinon.SinonStub;
    cork: sinon.SinonStub;
    uncork: sinon.SinonStub;
    destroy:sinon.SinonStub;
    addListener: sinon.SinonStub;
    emit: sinon.SinonStub;
    on: sinon.SinonStub;
    once: sinon.SinonStub;
    prependListener: sinon.SinonStub;
    prependOnceListener: sinon.SinonStub;
    removeListener: sinon.SinonStub;
    pipe: sinon.SinonStub;
    compose: sinon.SinonStub;
    [EventEmitter.captureRejectionSymbol]: sinon.SinonStub;
    off: sinon.SinonStub;
    removeAllListeners: sinon.SinonStub;
    setMaxListeners: sinon.SinonStub;
    getMaxListeners: sinon.SinonStub;
    listeners: sinon.SinonStub;
    rawListeners: sinon.SinonStub;
    listenerCount:sinon.SinonStub;
    eventNames:sinon.SinonStub;
    status: sinon.SinonStub;
    sendStatus: sinon.SinonStub;
    links: sinon.SinonStub;
    send: sinon.SinonStub;
    json: sinon.SinonStub;
    jsonp: sinon.SinonStub;
    sendFile: sinon.SinonStub;
    sendfile: sinon.SinonStub;
    

  constructor() {
    this.status = sinon.stub().returns(this);
    this.json = sinon.stub().returns(this);
    this.send = sinon.stub().returns(this);
    this.sendStatus = sinon.stub().returns(this);
    this.links = sinon.stub().returns(this);
    this.jsonp = sinon.stub().returns(this);
  }
}

class RequestMock implements Request{
    headers: Record<string, string> = {};

    constructor(headers?: Record<string, string>, params?: {id:string}) {
      if (headers) {
        this.headers = headers;
      }

      if(params) this.params = params;
    }


  range: sinon.SinonStub;
  accepted: any;
  params:any;
  query: any;
  app: any;
  res?:any;
  next?: any;
  [Symbol.asyncIterator]: sinon.SinonStub;
  [Symbol.asyncDispose]: sinon.SinonStub;
  [EventEmitter.captureRejectionSymbol]?:sinon.SinonStub;

  get: sinon.SinonStub;
  header: sinon.SinonStub;
  accepts: sinon.SinonStub;
  acceptsCharsets: sinon.SinonStub;
  acceptsEncodings: sinon.SinonStub;
  acceptsLanguages: sinon.SinonStub;
  param: sinon.SinonStub;
  is: sinon.SinonStub;
  protocol: string;
  secure: boolean;
  ip: string | undefined;
  ips: string[];
  subdomains: string[];
  path: string;
  hostname: string;
  host: string;
  fresh: boolean;
  stale: boolean;
  xhr: boolean;
  body: any;
  cookies: any;
  method: string;
  route: any;
  signedCookies: any;
  originalUrl: string;
  url: string;
  baseUrl: string;
  aborted: boolean;
  httpVersion: string;
  httpVersionMajor: number;
  httpVersionMinor: number;
  complete: boolean;
  connection: Socket;
  socket: Socket;
  headersDistinct: NodeJS.Dict<string[]>;
  rawHeaders: string[];
  trailers: NodeJS.Dict<string>;
  trailersDistinct: NodeJS.Dict<string[]>;
  rawTrailers: string[];
  setTimeout: sinon.SinonStub;
  statusCode?: number | undefined;
  statusMessage?: string | undefined;
  destroy: sinon.SinonStub;
  readableAborted: boolean;
  readable: boolean;
  readableDidRead: boolean;
  readableEncoding: BufferEncoding | null;
  readableEnded: boolean;
  readableFlowing: boolean | null;
  readableHighWaterMark: number;
  readableLength: number;
  readableObjectMode: boolean;
  destroyed: boolean;
  closed: boolean;
  errored: Error | null;
  _construct: sinon.SinonStub;
  _read: sinon.SinonStub;
  read: sinon.SinonStub;
  setEncoding: sinon.SinonStub;
  pause: sinon.SinonStub;
  resume: sinon.SinonStub;
  isPaused: sinon.SinonStub;
  unpipe: sinon.SinonStub;
  unshift: sinon.SinonStub;
  wrap: sinon.SinonStub;
  push: sinon.SinonStub;
  iterator: sinon.SinonStub;
  map: sinon.SinonStub;
  filter: sinon.SinonStub;
  forEach: sinon.SinonStub;
  toArray: sinon.SinonStub;
  some: sinon.SinonStub;
  find: sinon.SinonStub;
  every: sinon.SinonStub;
  flatMap: sinon.SinonStub;
  drop: sinon.SinonStub;
  take: sinon.SinonStub;
  asIndexedPairs: sinon.SinonStub;
  reduce: sinon.SinonStub;
  _destroy: sinon.SinonStub;
  addListener: sinon.SinonStub;
  emit: sinon.SinonStub;
  on: sinon.SinonStub;
  once: sinon.SinonStub;
  prependListener: sinon.SinonStub;
  prependOnceListener: sinon.SinonStub;
  removeListener: sinon.SinonStub;
  pipe: sinon.SinonStub;
  compose: sinon.SinonStub;
  off: sinon.SinonStub;
  removeAllListeners: sinon.SinonStub;
  setMaxListeners: sinon.SinonStub;
  getMaxListeners: sinon.SinonStub;
  listeners: sinon.SinonStub;
  rawListeners: sinon.SinonStub;
  listenerCount: sinon.SinonStub;
  eventNames: sinon.SinonStub;

  
}

export {RequestMock, ResponseMock};