package com.example.ertheosiswadi.smart_can;

import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Typeface;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

import org.w3c.dom.Text;

import java.util.Locale;

public class PointsActivity extends AppCompatActivity {

    private static final String TAG = "StatsActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_points);
        Button points_button = (Button) findViewById(R.id.points_button);
        Button qr_button = (Button) findViewById(R.id.qr_button);
        qr_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startQRActivity();
            }
        });
        Button stats_button = (Button) findViewById(R.id.stats_button);
        stats_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startStatsActivity();
            }
        });

        AssetManager am = this.getApplicationContext().getAssets();

        Typeface typeface = Typeface.createFromAsset(am,
                String.format(Locale.US, "fonts/%s", "Baloo.ttf"));

        stats_button.setTypeface(typeface);
        qr_button.setTypeface(typeface);
        points_button.setTypeface(typeface);

        final TextView points_textview = (TextView) findViewById(R.id.points_textview);
        points_textview.setText("-");
        points_textview.setTypeface(typeface);


        // Access a Cloud Firestore instance from your Activity
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        db.collection("users").document("NocLYvkHlnRlhP2nWRCNaXqMjZo2").get()
                .addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                        if (task.isSuccessful()) {
                            DocumentSnapshot document = task.getResult();
                            if (document.exists()) {
                                Log.d(TAG, "DocumentSnapshot data: " + document.getData().toString());

                                Integer rt = Integer.parseInt(document.getData().get("recycleCount").toString());
                                Integer tt = Integer.parseInt(document.getData().get("trashCount").toString());
                                tt = rt * tt * 500;
                                points_textview.setText(tt.toString());

                            } else {
                                Log.d(TAG, "No such document");
                            }
                        } else {
                            Log.d(TAG, "get failed with ", task.getException());
                        }

                    }
                });
    }

    private void startStatsActivity()
    {
        Intent intent = new Intent(this, StatsActivity.class);
        intent.putExtra("uuid", "NocLYvkHlnRlhP2nWRCNaXqMjZo2");
        startActivity(intent);
    }
    private void startQRActivity()
    {
        Intent intent = new Intent(this, QRActivity.class);
        intent.putExtra("uuid", "NocLYvkHlnRlhP2nWRCNaXqMjZo2");
        startActivity(intent);
    }
}
