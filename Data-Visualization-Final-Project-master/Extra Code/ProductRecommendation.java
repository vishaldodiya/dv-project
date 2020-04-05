package AmazonOA;

import java.util.*;

public class ProductRecommendation {

    public static class TrieNode {
        Map<Character, TrieNode> children;
        Queue<String> queue;
        public TrieNode() {
            this.children = new HashMap<>();
            this.queue = new PriorityQueue<>((a, b) -> b.toLowerCase().compareTo(a.toLowerCase()));
        }
    }

    private static TrieNode root;

    public static List<List<String>> productSuggestions(String[] repo, String query) {
        root = new TrieNode();

        query = query.toLowerCase();
        List<String> temp;
        List<List<String>> out = new ArrayList<>();
        for (String str : repo) {
            add(str);
        }
        int len = query.length();
        // mouse
        for (int i = len - 3; i <= len; i++) {
             temp = search(query.substring(0, i));
             if(temp.size()!=0)
                out.add(temp);
        }

        return out;
    }

    private static void add(String s) {
        TrieNode curr = root;
        for (char ch : s.toCharArray()) {
            TrieNode next = curr.children.get(ch);
            if (next == null) {
                next = new TrieNode();
                curr.children.put(ch, next);
            }
            next.queue.offer(s);
            if (next.queue.size() > 3) {
                next.queue.poll();
            }
            curr = next;
        }

    }

    private static List<String> search(String input) {
        List<String> res = new ArrayList<>();
        TrieNode p = root;
        for (char c : input.toCharArray()) {
            TrieNode child = p.children.get(c);
            if (child == null) { // if not found, return an empty
                return new ArrayList<>();
            }
            p = child;
        }
        PriorityQueue<String> pq = new PriorityQueue<>(p.queue);
        int cnt = 0;
        while (!pq.isEmpty() && cnt < 3) {
            res.add(0, pq.poll());
            cnt++;
        }
        //System.out.println(res.toString());
        return res;

    }

    public static void main(String[] args) {
//        String[] repository = {"mobile", "mouse", "moneypot", "monitor", "mousepad"};
//        String customerQuery = "mOUsE";
//        System.out.println(productSuggestions(repository, customerQuery));

        String[] repository = {"ps4", "ps4 slim", "ps4 pro", "xbox", "tissue",
                "standing table", "house", "true love", "tracking device"};
        String customerQuery = "ps4";
        System.out.println(productSuggestions(repository, customerQuery));
    }
}
