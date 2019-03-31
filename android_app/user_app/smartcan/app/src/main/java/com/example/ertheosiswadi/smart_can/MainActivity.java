package com.example.ertheosiswadi.smart_can;

import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Typeface;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.w3c.dom.Text;

import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        AssetManager am = this.getApplicationContext().getAssets();

        Typeface typeface = Typeface.createFromAsset(am,
                String.format(Locale.US, "fonts/%s", "Baloo.ttf"));

        TextView login_tv = (TextView) findViewById(R.id.login_textview);
        Button login_button = (Button) findViewById(R.id.login_button);
        login_button.setTypeface(typeface);
        login_tv.setTypeface(typeface);

        //get the user's uuid based on the login info and pass it to the next activity biar bisa generate the QR code

        login_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startStatsActivity();
            }
        });
    }

    private void startStatsActivity()
    {
        Intent intent = new Intent(this, StatsActivity.class);
        intent.putExtra("uuid", "NocLYvkHlnRlhP2nWRCNaXqMjZo2");
        startActivity(intent);
    }
}
