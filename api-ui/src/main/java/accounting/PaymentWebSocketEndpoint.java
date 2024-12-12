package accounting;

import java.util.concurrent.CopyOnWriteArraySet;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint("/ws/payments")
public class PaymentWebSocketEndpoint {

	private static final CopyOnWriteArraySet<Session> sessions = new CopyOnWriteArraySet<>();

	@OnOpen
	public void onOpen(Session session) {
		sessions.add(session);
		System.out.println("New WebSocket connection: " + session.getId());
	}

	@OnMessage
	public void onMessage(String message, Session session) {
		System.out.println("Received message: " + message);
	}

	@OnClose
	public void onClose(Session session) {
		sessions.remove(session);
		System.out.println("WebSocket session closed: " + session.getId());
	}

	public static void broadcast(String message) {
		for (Session session : sessions) {
			try {
				session.getBasicRemote().sendText(message);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
